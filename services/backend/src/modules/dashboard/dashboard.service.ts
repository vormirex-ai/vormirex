import mongoose from 'mongoose';
import User from '../user/user.model.js';
import Subject from '../subjects/subject.model.js';
import SubjectProgress from '../subjects/subjectProgress.model.js';
import Chapter from '../subjects/chapter.model.js';
import Lesson from '../subjects/lesson.model.js';
import QuizResult from '../quizzes/quizResult.model.js';
import FlashcardSession from '../flashcards/flashcardSession.model.js';
import ChallengeResult from '../challenges/challengeResult.model.js';

class DashboardService {
  async getDashboardData(userId: string) {
    const userObjId = new mongoose.Types.ObjectId(userId);

    // 1. Fetch user document
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // 2. Fetch user's subject progress entries
    const progressEntries = await SubjectProgress.find({ userId: userObjId }).populate('subjectId');

    // 3. Process Continue Learning & Subject Progress
    const continueLearning: any[] = [];
    const subjectProgress: any[] = [];
    let overallCompletionSum = 0;
    let totalStudyTimeSec = 0;

    for (const entry of progressEntries) {
      const subject = entry.subjectId as any;
      if (!subject) continue;

      // Accumulate study time
      totalStudyTimeSec += entry.totalStudyTimeSeconds || 0;

      // Find chapters and count total lessons for this subject
      const chapters = await Chapter.find({ subjectId: subject._id });
      const chapterIds = chapters.map((c) => c._id);
      let totalLessons = await Lesson.countDocuments({ chapterId: { $in: chapterIds } });

      // Default total lessons to 10 if none found to avoid division by zero
      if (totalLessons === 0) totalLessons = 10;

      const completedCount = entry.completedLessons?.length || 0;
      const completionPercentage = Math.min(
        100,
        Math.round((completedCount / totalLessons) * 100)
      );

      overallCompletionSum += completionPercentage;

      // Get first tag or fallback to title
      const category = subject.tags?.[0]?.toUpperCase() || 'SUBJECT';

      // 6 mins left per remaining lesson
      const remainingLessons = Math.max(0, totalLessons - completedCount);
      const minsLeft = remainingLessons * 6;

      continueLearning.push({
        subjectId: subject._id,
        subject: category,
        title: subject.title,
        timeLeftMinutes: minsLeft > 0 ? minsLeft : 15,
        percent: completionPercentage,
      });

      subjectProgress.push({
        subject: subject.title,
        percent: completionPercentage,
      });
    }

    // Fallbacks if user is not enrolled/has no progress (for premium visual experience)
    if (continueLearning.length === 0) {
      continueLearning.push(
        {
          subject: 'MATHEMATICS',
          title: 'Calculus Integration Techniques',
          timeLeftMinutes: 18,
          percent: 62,
        },
        {
          subject: 'CODING',
          title: 'Python Object-Oriented Programming',
          timeLeftMinutes: 32,
          percent: 41,
        }
      );

      subjectProgress.push(
        { subject: 'Mathematics', percent: 73 },
        { subject: 'Python Coding', percent: 68 },
        { subject: 'Physics', percent: 47 }
      );

      overallCompletionSum = 188; // (73 + 68 + 47)
      totalStudyTimeSec = 124 * 3600; // Mocked 124 hours
    }

    const overallCompletion = Math.round(overallCompletionSum / subjectProgress.length);
    const totalStudyHours = Math.round((totalStudyTimeSec / 3600) * 10) / 10;

    // 4. Assemble mock weekly activity
    const weeklyActivity = [
      { day: 'Mon', minutesStudied: 30 },
      { day: 'Tue', minutesStudied: 45 },
      { day: 'Wed', minutesStudied: 60 },
      { day: 'Thu', minutesStudied: 82 },
      { day: 'Fri', minutesStudied: 40 },
      { day: 'Sat', minutesStudied: 75 },
      { day: 'Sun', minutesStudied: 90 },
    ];

    // 5. Assemble mock recommendations
    const aiRecommendations = [
      { title: 'Review Integration by Parts', tag: 'Weak Spot' },
      { title: 'Practice Python Decorators', tag: 'Recommended' },
      { title: 'Take Weekly Quiz', tag: 'New' },
    ];

    // 6. Aggregate recent activities from database
    const [quizResults, flashcardSessions, challengeResults] = await Promise.all([
      QuizResult.find({ userId: userObjId }).sort({ createdAt: -1 }).limit(5),
      FlashcardSession.find({ userId: userObjId }).populate('deckId').sort({ createdAt: -1 }).limit(5),
      ChallengeResult.find({ userId: userObjId }).sort({ createdAt: -1 }).limit(5),
    ]);

    const activities: any[] = [];

    for (const q of quizResults) {
      const subj = await Subject.findById(q.subjectId);
      activities.push({
        type: 'quiz',
        title: `Completed ${subj?.title || 'JavaScript'} Quiz`,
        score: `${q.score}%`,
        createdAt: q.createdAt,
      });
    }

    for (const f of flashcardSessions) {
      const deckName = (f.deckId as any)?.name || 'Basics';
      activities.push({
        type: 'flashcard',
        title: `Completed ${deckName} Flashcards`,
        score: `${f.score}%`,
        createdAt: f.createdAt,
      });
    }

    for (const c of challengeResults) {
      activities.push({
        type: 'challenge',
        title: 'Completed Daily Challenge',
        score: `${c.score}%`,
        createdAt: c.createdAt,
      });
    }

    // Sort combined activities by date descending and limit to 5
    activities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const recentActivity = activities.slice(0, 5);

    // If no real activities in DB, supply the mock dashboard records matching UI
    if (recentActivity.length === 0) {
      const mockDate = new Date();
      recentActivity.push(
        {
          type: 'quiz',
          title: 'Completed Calculus Quiz',
          score: '80%',
          createdAt: new Date(mockDate.getTime() - 2 * 3600 * 1000), // 2h ago
        },
        {
          type: 'quiz',
          title: 'Completed Physics Basics Quiz',
          score: '70%',
          createdAt: new Date(mockDate.getTime() - 5 * 3600 * 1000), // 5h ago
        },
        {
          type: 'chat',
          title: "AI Chat about Newton's Laws",
          score: 'N/A',
          createdAt: new Date(mockDate.getTime() - 24 * 3600 * 1000), // Yesterday
        }
      );
    }

    const dailyStreakVal = user.streak?.current || 0;
    const totalXp = user.xp || 0;

    return {
      welcome: {
        name: user.name,
        streak: dailyStreakVal,
        xp: totalXp,
      },
      metrics: {
        dailyStreak: {
          value: dailyStreakVal,
          weeklyDiff: 3,
        },
        overallCompletion: {
          value: overallCompletion,
          weeklyDiff: 4,
        },
        totalStudyTime: {
          value: totalStudyHours > 0 ? totalStudyHours : 124,
          todayDiff: 3.2,
        },
        xpPoints: {
          value: totalXp,
          todayDiff: 120,
        },
      },
      continueLearning,
      weeklyActivity,
      subjectProgress,
      aiRecommendations,
      recentActivity,
    };
  }
}

export default new DashboardService();
