import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import dashboardService from './dashboard.service.js';
import User from '../user/user.model.js';
import SubjectProgress from '../subjects/subjectProgress.model.js';
import Chapter from '../subjects/chapter.model.js';
import Lesson from '../subjects/lesson.model.js';
import QuizResult from '../quizzes/quizResult.model.js';
import FlashcardSession from '../flashcards/flashcardSession.model.js';
import ChallengeResult from '../challenges/challengeResult.model.js';
import mongoose from 'mongoose';

describe('Dashboard Service Unit Tests', () => {
  const mockUserId = '60d0fe4f5311236168a109ca';

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should throw an error if the user is not found', async () => {
    jest.spyOn(User, 'findById').mockResolvedValue(null as any);

    await expect(dashboardService.getDashboardData(mockUserId)).rejects.toThrow('User not found');
  });

  it('should return metrics, weeklyActivity, recommendations, and subject progress list', async () => {
    const mockUser = {
      _id: mockUserId,
      name: 'Ashish Kumar Singh',
      xp: 2840,
      streak: { current: 12 },
    };

    const mockProgress = [
      {
        userId: mockUserId,
        subjectId: {
          _id: 's1',
          title: 'Calculus Integration Techniques',
          tags: ['mathematics'],
        },
        completedLessons: ['l1', 'l2'], // 2 lessons completed
        totalStudyTimeSeconds: 3600 * 2, // 2 hours
        status: 'enrolled',
      },
    ];

    jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
    jest.spyOn(SubjectProgress, 'find').mockReturnValue({
      populate: jest.fn().mockReturnValue(Promise.resolve(mockProgress)),
    } as any);

    // Mock chapters and lessons count
    const mockChapters = [{ _id: 'ch1' }];
    jest.spyOn(Chapter, 'find').mockResolvedValue(mockChapters as any);
    jest.spyOn(Lesson, 'countDocuments').mockResolvedValue(3); // 3 lessons total (67%)

    // Mock recent activity queries to run immediately without real DB access
    jest.spyOn(QuizResult, 'find').mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([]),
      }),
    } as any);

    jest.spyOn(FlashcardSession, 'find').mockReturnValue({
      populate: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
        }),
      }),
    } as any);

    jest.spyOn(ChallengeResult, 'find').mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([]),
      }),
    } as any);

    const data = await dashboardService.getDashboardData(mockUserId);

    expect(data.welcome.name).toBe('Ashish Kumar Singh');
    expect(data.welcome.streak).toBe(12);
    expect(data.welcome.xp).toBe(2840);

    expect(data.metrics.dailyStreak.value).toBe(12);
    expect(data.metrics.xpPoints.value).toBe(2840);
    expect(data.metrics.overallCompletion.value).toBe(67); // 2 out of 3 lessons = 67%

    expect(data.continueLearning.length).toBe(1);
    expect(data.continueLearning[0].title).toBe('Calculus Integration Techniques');
    expect(data.continueLearning[0].percent).toBe(67);
    expect(data.continueLearning[0].subject).toBe('MATHEMATICS');

    expect(data.weeklyActivity.length).toBe(7);
    expect(data.aiRecommendations.length).toBe(3);
    expect(data.recentActivity.length).toBe(3); // fallback mock size
  });

  it('should fallback to mock dashboard data if user has no subject progress', async () => {
    const mockUser = {
      _id: mockUserId,
      name: 'Ashish Kumar Singh',
      xp: 2840,
      streak: { current: 12 },
    };

    jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
    jest.spyOn(SubjectProgress, 'find').mockReturnValue({
      populate: jest.fn().mockReturnValue(Promise.resolve([])), // No progress entries
    } as any);

    // Mock recent activity queries
    jest.spyOn(QuizResult, 'find').mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([]),
      }),
    } as any);

    jest.spyOn(FlashcardSession, 'find').mockReturnValue({
      populate: jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
        }),
      }),
    } as any);

    jest.spyOn(ChallengeResult, 'find').mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([]),
      }),
    } as any);

    const data = await dashboardService.getDashboardData(mockUserId);

    // Verify fallback data is returned
    expect(data.continueLearning.length).toBe(2); // Calculus + Python
    expect(data.subjectProgress.length).toBe(3);  // Math, Python, Physics
    expect(data.metrics.overallCompletion.value).toBe(63); // round((73 + 68 + 47) / 3) = 63
  });
});
