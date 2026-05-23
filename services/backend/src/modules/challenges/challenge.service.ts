import mongoose from 'mongoose';
import seedrandom from 'seedrandom';
import User from '../user/user.model.js';
import QuizQuestion from '../quizzes/quizQuestion.model.js';
import ChallengeResult from './challengeResult.model.js';
import { BadRequestError, ConflictError, NotFoundError } from '../../utils/errors.js';

/**
 * Helper to format date in user's timezone as YYYY-MM-DD
 */
const getDateString = (date: Date, tz: string): string => {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

export const getTodayChallenge = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const subjects = user.learningPreferences?.selectedSubjects || [];
  if (subjects.length === 0) {
    throw new BadRequestError('Please select at least one subject in your learning preferences.');
  }

  const timezone = user.timezone || 'UTC';
  const todayString = getDateString(new Date(), timezone);

  // Check if they already completed today's challenge
  const challengeResult = await ChallengeResult.findOne({ userId, dateString: todayString });
  if (challengeResult) {
    return {
      completed: true,
      challengeResult,
    };
  }

  // Deterministic Seed generation: today YYYY-MM-DD + sorted subjects
  const sortedSubjects = [...subjects].sort();
  const seed = `${todayString}_${sortedSubjects.join(',')}`;

  // Get all question IDs for subjects
  const questions = await QuizQuestion.find({ subjectId: { $in: sortedSubjects } }).select('_id');
  if (questions.length === 0) {
    throw new NotFoundError('No quiz questions found for your selected subjects.');
  }

  // Shuffle question IDs using deterministic seedrandom
  // @ts-ignore
  const rng = (seedrandom.default || seedrandom)(seed);
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Select top 5 questions (or all if fewer than 5)
  const selectedIds = shuffled.slice(0, 5).map(q => q._id);
  const selectedQuestions = await QuizQuestion.find({ _id: { $in: selectedIds } });

  // Order questions exactly as selectedIds (preserving the shuffle order)
  const questionMap = new Map(selectedQuestions.map(q => [q._id.toString(), q]));
  const orderedQuestions = selectedIds
    .map(id => questionMap.get(id.toString()))
    .filter(Boolean);

  // Sanitize: omit correctAnswer and explanation
  const sanitizedQuestions = orderedQuestions.map(q => {
    const obj = q!.toObject() as any;
    delete obj.correctAnswer;
    delete obj.explanation;
    return obj;
  });

  return {
    completed: false,
    questions: sanitizedQuestions,
  };
};

export const submitChallenge = async (
  userId: string,
  answers: { questionId: string; selectedOption: string; timeToAnswer: number }[],
  timeSpent?: number
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const timezone = user.timezone || 'UTC';
  const todayString = getDateString(new Date(), timezone);

  // 1. Prevent multiple submissions for the same day
  const existingResult = await ChallengeResult.findOne({ userId, dateString: todayString });
  if (existingResult) {
    throw new ConflictError("You have already completed today's daily challenge.");
  }

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    throw new BadRequestError('Invalid or empty answers format');
  }

  // 2. Grade the answers and calculate speed bonuses
  let questionsCorrect = 0;
  let xpEarned = 15; // Base XP
  const evaluatedAnswers = [];

  for (const answer of answers) {
    const question = await QuizQuestion.findById(answer.questionId);
    if (!question) {
      throw new NotFoundError(`Question not found: ${answer.questionId}`);
    }

    const isCorrect = question.correctAnswer === answer.selectedOption;
    if (isCorrect) {
      questionsCorrect++;
      // Speed bonus: correct and answered in under 10 seconds
      if (answer.timeToAnswer < 10000) {
        xpEarned += 5;
      }
    }

    evaluatedAnswers.push({
      questionId: question._id,
      selectedOption: answer.selectedOption,
      isCorrect,
      timeToAnswer: answer.timeToAnswer,
    });
  }

  const score = Math.round((questionsCorrect / answers.length) * 100);
  const totalTimeSpentSeconds =
    timeSpent !== undefined
      ? timeSpent
      : Math.round(answers.reduce((acc, curr) => acc + (curr.timeToAnswer || 0), 0) / 1000);

  // 3. Update Isolated Streak
  const now = new Date();
  if (!user.challengeStreak) {
    user.challengeStreak = {
      current: 1,
      longest: 1,
      lastActivityDate: now,
    };
  } else {
    const lastActivityDate = user.challengeStreak.lastActivityDate
      ? new Date(user.challengeStreak.lastActivityDate)
      : null;

    if (!lastActivityDate) {
      user.challengeStreak.current = 1;
      user.challengeStreak.longest = Math.max(user.challengeStreak.longest, 1);
      user.challengeStreak.lastActivityDate = now;
    } else {
      const lastActivityString = getDateString(lastActivityDate, timezone);
      if (lastActivityString !== todayString) {
        const todayDate = new Date(todayString);
        const lastDate = new Date(lastActivityString);
        const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          user.challengeStreak.current += 1;
        } else {
          // Missed a day
          user.challengeStreak.current = 1;
        }

        if (user.challengeStreak.current > user.challengeStreak.longest) {
          user.challengeStreak.longest = user.challengeStreak.current;
        }
        user.challengeStreak.lastActivityDate = now;
      }
    }
  }

  // Increment user XP
  user.xp += xpEarned;
  await user.save();

  // Save challenge result
  const challengeResult = await ChallengeResult.create({
    userId,
    dateString: todayString,
    score,
    xpEarned,
    timeSpent: totalTimeSpentSeconds,
    questionsCorrect,
    answers: evaluatedAnswers,
  });

  return {
    challengeResult,
    xpEarned,
    newTotalXp: user.xp,
  };
};

export const getChallengeHistory = async (userId: string, limit: number, offset: number) => {
  return await ChallengeResult.find({ userId })
    .sort({ dateString: -1, createdAt: -1 })
    .skip(offset)
    .limit(limit);
};

export const getChallengeStreakAndStats = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const streak = user.challengeStreak || { current: 0, longest: 0, lastActivityDate: null };

  const stats = await ChallengeResult.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        averageScore: { $avg: '$score' },
        totalAttempts: { $sum: 1 },
      },
    },
  ]);

  return {
    current: streak.current,
    longest: streak.longest,
    lastActivityDate: streak.lastActivityDate,
    averageScore: stats.length > 0 ? Math.round(stats[0].averageScore) : 0,
    totalAttempts: stats.length > 0 ? stats[0].totalAttempts : 0,
  };
};

export const getChallengeCalendar = async (userId: string, month: string) => {
  // Validate month format (YYYY-MM)
  if (!/^\d{4}-\d{2}$/.test(month)) {
    throw new BadRequestError('Invalid month format. Expected YYYY-MM.');
  }

  const results = await ChallengeResult.find({
    userId,
    dateString: { $regex: new RegExp('^' + month) },
  }).select('dateString score xpEarned');

  return results.map(r => ({
    date: r.dateString,
    score: r.score,
    xpEarned: r.xpEarned,
  }));
};

export default {
  getTodayChallenge,
  submitChallenge,
  getChallengeHistory,
  getChallengeStreakAndStats,
  getChallengeCalendar,
};
