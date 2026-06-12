import mongoose from 'mongoose';
import QuizQuestion from './quizQuestion.model.js';
import QuizResult from './quizResult.model.js';
import User from '../user/user.model.js';

export const generateQuizQuestions = async (subjectId: string) => {
  return await QuizQuestion.aggregate([
    { $match: { subjectId } },
    { $sample: { size: 5 } },
    { $project: { correctAnswer: 0, explanation: 0 } }
  ]);
};

export const verifyQuestionAnswer = async (questionId: string, selectedOption: string) => {
  const question = await QuizQuestion.findById(questionId);
  if (!question) return null;

  const isCorrect = question.correctAnswer === selectedOption;
  return {
    isCorrect,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation || '',
    xpEarned: isCorrect ? 40 : 0
  };
};

export const evaluateAndSubmitQuiz = async (userId: string, subjectId: string, answers: any[], timeTaken: number) => {
  let correctCount = 0;
  const evaluatedAnswers = [];

  for (const answer of answers) {
    const question = await QuizQuestion.findById(answer.questionId);
    if (!question) continue;

    const isCorrect = question.correctAnswer === answer.selectedOption;
    if (isCorrect) correctCount++;

    evaluatedAnswers.push({
      questionId: question._id,
      selectedOption: answer.selectedOption,
      isCorrect
    });
  }

  const totalQuestions = answers.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  const xpEarned = correctCount * 40;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $inc: { xp: xpEarned } },
    { new: true }
  );

  const quizResult = await QuizResult.create({
    userId,
    subjectId,
    score: scorePercentage,
    totalQuestions,
    timeTaken,
    xpEarned,
    answers: evaluatedAnswers
  });

  return { quizResult, xpEarned, newTotalXp: updatedUser?.xp };
};

export const verifyAndGetQuestionDetail = async (userId: string, questionId: string) => {
  const hasAttempted = await QuizResult.exists({
    userId,
    'answers.questionId': questionId
  });

  if (!hasAttempted) return null;

  return await QuizQuestion.findById(questionId);
};

export const getUserQuizHistory = async (userId: string, limit: number, offset: number) => {
  return await QuizResult.find({ userId })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);
};

export const getSubjectTrends = async (userId: string, subjectId: string) => {
  const history = await QuizResult.find({ userId, subjectId }).sort({ createdAt: -1 });

  if (!history.length) {
    return { history: [], averageScore: 0, bestScore: 0, totalAttempts: 0, trend: 'stable' };
  }

  const totalAttempts = history.length;
  const bestScore = Math.max(...history.map(r => r.score));
  const averageScore = Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / totalAttempts);

  let trend = 'stable';
  if (totalAttempts >= 2) {
    const recent = history.slice(0, 3).map(r => r.score).reverse();
    if (recent[recent.length - 1] > recent[0]) trend = 'improving';
    else if (recent[recent.length - 1] < recent[0]) trend = 'declining';
  }

  return { history, averageScore, bestScore, totalAttempts, trend };
};

export const calculateGlobalStats = async (userId: string) => {
  const userObjId = new mongoose.Types.ObjectId(userId);

  const stats = await QuizResult.aggregate([
    { $match: { userId: userObjId } },
    { 
      $group: {
        _id: '$subjectId',
        averageScore: { $avg: '$score' },
        attempts: { $sum: 1 }
      }
    },
    { $sort: { averageScore: -1 } }
  ]);

  if (!stats.length) return null;

  const overallAverage = Math.round(stats.reduce((acc, curr) => acc + curr.averageScore, 0) / stats.length);
  const bestSubject = stats[0]._id;
  const weakestSubject = stats[stats.length - 1]._id;

  return {
    overallAverage,
    bestSubject,
    weakestSubject,
    totalQuizzesTaken: stats.reduce((acc, curr) => acc + curr.attempts, 0),
    perSubjectAverage: stats
  };
};

export default {
  generateQuizQuestions,
  verifyQuestionAnswer,
  evaluateAndSubmitQuiz,
  verifyAndGetQuestionDetail,
  getUserQuizHistory,
  getSubjectTrends,
  calculateGlobalStats
};
