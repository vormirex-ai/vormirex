import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import userController from './user.controller.js';
import User from './user.model.js';
import SubjectProgress from '../subjects/subjectProgress.model.js';
import QuizResult from '../quizzes/quizResult.model.js';

describe('User Profile Unit Tests', () => {
  const mockUserId = '60d0fe4f5311236168a109ca';
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    jest.restoreAllMocks();
    mockReq = {
      user: { userId: mockUserId },
      query: {},
      params: {},
      body: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe('updateProfile', () => {
    it('should successfully update name, timezone, phoneNumber, username, and bio', async () => {
      const mockUser = {
        _id: mockUserId,
        name: 'Old Name',
        save: jest.fn(() => Promise.resolve(true as any)),
      };

      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(User, 'findOne').mockResolvedValue(null); // username unique check passes

      mockReq.body = {
        name: 'New Name',
        username: 'new_username',
        bio: 'This is my new bio',
      };

      await userController.updateProfile(mockReq, mockRes);

      expect(mockUser.name).toBe('New Name');
      expect((mockUser as any).username).toBe('new_username');
      expect((mockUser as any).bio).toBe('This is my new bio');
      expect(mockUser.save).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Profile updated successfully',
        })
      );
    });

    it('should throw an error if username is already taken by another user', async () => {
      const mockUser = {
        _id: mockUserId,
        username: 'old_username',
        save: jest.fn(),
      };

      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(User, 'findOne').mockResolvedValue({ _id: 'another_user_id' } as any); // username taken

      mockReq.body = {
        username: 'taken_username',
      };

      await expect(userController.updateProfile(mockReq, mockRes)).rejects.toThrow(
        'Username is already taken'
      );
      expect(mockUser.save).not.toHaveBeenCalled();
    });
  });

  describe('getProfilePageData', () => {
    it('should return unified profile stats, badges, weak topics, and AI insights', async () => {
      const mockUser = {
        _id: mockUserId,
        name: 'Sandhya',
        email: 'sandhya@gmail.com',
        username: 'alexj',
        bio: 'Passionate learner',
        isPro: true,
        xp: 2840,
        streak: { current: 12, longest: 12 },
      };

      const mockProgress = [
        { totalStudyTimeSeconds: 10 * 3600 }, // 10 hours
        { totalStudyTimeSeconds: 15 * 3600 }, // 15 hours
      ];

      const mockQuizResults = [
        { score: 50, subjectId: { title: 'Integration by Parts' } },
        { score: 90, subjectId: { title: 'Calculus Intro' } },
      ];

      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(SubjectProgress, 'find').mockResolvedValue(mockProgress as any);
      jest.spyOn(QuizResult, 'countDocuments').mockResolvedValue(4);
      jest.spyOn(QuizResult, 'find').mockReturnValue({
        populate: jest.fn(() => Promise.resolve(mockQuizResults as any)),
      } as any);

      await userController.getProfilePageData(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          user: expect.objectContaining({
            name: 'Sandhya',
            username: 'alexj',
            isPro: true,
            level: 9, // Math.floor(2840 / 350) + 1 = 9
          }),
          stats: expect.objectContaining({
            totalStudyTime: 25, // 10 + 15 hours
            dayStreak: 12,
            activeSubjects: 2,
            xpPoints: 2840,
          }),
          badges: expect.any(Array),
          topicsToImprove: expect.any(Array),
          insights: expect.any(Array),
        })
      );
    });

    it('should return mock fallbacks for stats, weak topics and badges if none exist', async () => {
      const mockUser = {
        _id: mockUserId,
        name: 'Sandhya',
        xp: 0,
        streak: { current: 0, longest: 0 },
      };

      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(SubjectProgress, 'find').mockResolvedValue([]);
      jest.spyOn(QuizResult, 'countDocuments').mockResolvedValue(0);
      jest.spyOn(QuizResult, 'find').mockReturnValue({
        populate: jest.fn(() => Promise.resolve([])),
      } as any);

      await userController.getProfilePageData(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          stats: expect.objectContaining({
            totalStudyTime: 124, // Fallback hours
            activeSubjects: 3,   // Fallback count
          }),
          topicsToImprove: expect.arrayContaining([
            expect.objectContaining({ topic: 'Integration by Parts', percent: 52 }),
          ]),
        })
      );
    });
  });
});
