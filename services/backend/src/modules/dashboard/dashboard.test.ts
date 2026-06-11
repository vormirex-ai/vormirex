import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import dashboardService from './dashboard.service.js';
import User from '../user/user.model.js';
import Progress from '../progress/progress.model.js';
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

  it('should return metrics, weeklyActivity, recommendations, and course progress list', async () => {
    const mockUser = {
      _id: mockUserId,
      name: 'Ashish Kumar Singh',
      xp: 2840,
      streak: { current: 12 },
    };

    const mockProgress = [
      {
        userId: mockUserId,
        courseId: {
          _id: 'c1',
          title: 'Calculus Integration Techniques',
          tags: ['mathematics'],
          levels: [
            {
              level: 'FOUNDATION',
              modules: [
                {
                  title: 'Module 1',
                  items: ['Item 1', 'Item 2', 'Item 3'], // 3 lessons total
                },
              ],
            },
          ],
        },
        completedLessons: ['l1', 'l2'], // 2 lessons completed (67%)
        status: 'enrolled',
      },
    ];

    jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
    jest.spyOn(Progress, 'find').mockReturnValue({
      populate: jest.fn().mockReturnValue(Promise.resolve(mockProgress)),
    } as any);

    const data = await dashboardService.getDashboardData(mockUserId);

    expect(data.welcome.name).toBe('Ashish Kumar Singh');
    expect(data.welcome.streak).toBe(12);
    expect(data.welcome.xp).toBe(2840);

    expect(data.metrics.dailyStreak.value).toBe(12);
    expect(data.metrics.xpPoints.value).toBe(2840);
    expect(data.metrics.overallCompletion.value).toBe(67); // calculated from 2 out of 3 lessons

    expect(data.continueLearning.length).toBe(1);
    expect(data.continueLearning[0].title).toBe('Calculus Integration Techniques');
    expect(data.continueLearning[0].percent).toBe(67);
    expect(data.continueLearning[0].subject).toBe('MATHEMATICS');

    expect(data.weeklyActivity.length).toBe(7);
    expect(data.aiRecommendations.length).toBe(3);
  });

  it('should fallback to mock dashboard data if user has no course progress', async () => {
    const mockUser = {
      _id: mockUserId,
      name: 'Ashish Kumar Singh',
      xp: 2840,
      streak: { current: 12 },
    };

    jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
    jest.spyOn(Progress, 'find').mockReturnValue({
      populate: jest.fn().mockReturnValue(Promise.resolve([])), // No progress entries
    } as any);

    const data = await dashboardService.getDashboardData(mockUserId);

    // Verify fallback data is returned
    expect(data.continueLearning.length).toBe(2); // Calculus + Python
    expect(data.subjectProgress.length).toBe(3);  // Math, Python, Physics
    expect(data.metrics.overallCompletion.value).toBe(63); // round((73 + 68 + 47) / 3) = 63
  });
});
