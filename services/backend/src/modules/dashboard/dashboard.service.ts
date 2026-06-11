import mongoose from 'mongoose';
import User from '../user/user.model.js';
import Progress from '../progress/progress.model.js';
import Course from '../courses/course.model.js';
import Subject from '../subjects/subject.model.js';

class DashboardService {
  async getDashboardData(userId: string) {
    const userObjId = new mongoose.Types.ObjectId(userId);

    // 1. Fetch user document
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // 2. Fetch user's course progress entries
    const progressEntries = await Progress.find({ userId: userObjId }).populate('courseId');

    // 3. Process Continue Learning & Subject Progress
    const continueLearning: any[] = [];
    const subjectProgress: any[] = [];
    let overallCompletionSum = 0;

    for (const entry of progressEntries) {
      const course = entry.courseId as any;
      if (!course) continue;

      // Count total lessons from course curriculum levels
      let totalLessons = 0;
      if (course.levels) {
        for (const lvl of course.levels) {
          if (lvl.modules) {
            for (const mod of lvl.modules) {
              if (mod.items) {
                totalLessons += mod.items.length;
              }
            }
          }
        }
      }

      // Default total lessons to 10 if none found to avoid division by zero
      if (totalLessons === 0) totalLessons = 10;

      const completedCount = entry.completedLessons?.length || 0;
      const completionPercentage = Math.min(
        100,
        Math.round((completedCount / totalLessons) * 100)
      );

      overallCompletionSum += completionPercentage;

      // Map course tags or category as the subject name
      const category = course.tags?.[0]?.toUpperCase() || 'GENERAL';

      // 18 mins left (mock calculation based on remaining lessons * 6 mins each)
      const remainingLessons = Math.max(0, totalLessons - completedCount);
      const minsLeft = remainingLessons * 6;

      continueLearning.push({
        courseId: course._id,
        subject: category,
        title: course.title,
        timeLeftMinutes: minsLeft > 0 ? minsLeft : 15,
        percent: completionPercentage,
      });

      subjectProgress.push({
        subject: course.title,
        percent: completionPercentage,
      });
    }

    // Fallbacks if user is not enrolled in anything yet (for premium visual experience)
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
    }

    const overallCompletion = Math.round(overallCompletionSum / subjectProgress.length);

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
          value: 124,
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
    };
  }
}

export default new DashboardService();
