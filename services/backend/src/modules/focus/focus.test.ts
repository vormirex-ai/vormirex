import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import focusController from './focus.controller.js';
import FocusTask from './focusTask.model.js';
import FocusSession from './focusSession.model.js';
import User from '../user/user.model.js';

describe('Focus Timer Controller Unit Tests', () => {
  const mockUserId = '60d0fe4f5311236168a109ca';
  const mockTaskId = '60d0fe4f5311236168a109cb';
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    jest.restoreAllMocks();
    // @ts-ignore
    global.__MOCK_AWARD_XP__ = jest.fn().mockImplementation(() => Promise.resolve());
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

  describe('getFocusDashboard', () => {
    it('should aggregate focus stats and tasks into a unified response', async () => {
      const mockUser = {
        _id: mockUserId,
        streak: { current: 12 },
        timezone: 'UTC',
      };

      const mockTasks = [
        { _id: mockTaskId, title: 'Calculus Integration', status: 'active', priority: 'high' },
        { title: 'Python OOP', status: 'upcoming', priority: 'medium' },
      ];

      const mockSessions = [
        { type: 'focus', durationMinutes: 25, completedAt: new Date() },
        { type: 'focus', durationMinutes: 25, completedAt: new Date() },
        { type: 'short-break', durationMinutes: 5, completedAt: new Date() },
      ];

      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      
      (jest.spyOn(FocusTask, 'find') as any).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn(() => Promise.resolve(mockTasks as any)),
        }),
      });

      jest.spyOn(FocusSession, 'find').mockResolvedValue(mockSessions as any);

      await focusController.getFocusDashboard(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        stats: {
          sessionsToday: 2, // only type: 'focus'
          focusedTimeToday: 50,
          xpEarnedToday: 80, // 2 sessions * 40 XP
          dayStreak: 12,
        },
        tasks: mockTasks,
      });
    });
  });

  describe('createTask', () => {
    it('should create a task and return the updated dashboard', async () => {
      mockReq.body = {
        title: 'New Study Task',
        priority: 'high',
        estimatedPomodoros: 2,
      };

      const mockUser = { _id: mockUserId, streak: { current: 1 }, timezone: 'UTC' };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(FocusTask, 'create').mockResolvedValue({} as any);
      
      (jest.spyOn(FocusTask, 'find') as any).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn(() => Promise.resolve([] as any)),
        }),
      });

      jest.spyOn(FocusSession, 'find').mockResolvedValue([]);

      await focusController.createTask(mockReq, mockRes);

      expect(FocusTask.create).toHaveBeenCalledWith(expect.objectContaining({
        userId: mockUserId,
        title: 'New Study Task',
      }));
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Task created',
          stats: expect.any(Object),
          tasks: expect.any(Array),
        })
      );
    });
  });

  describe('updateTask', () => {
    it('should update a task successfully and return updated dashboard', async () => {
      mockReq.params.id = mockTaskId;
      mockReq.body = { status: 'completed' };

      const mockUser = { _id: mockUserId, streak: { current: 1 }, timezone: 'UTC' };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      
      jest.spyOn(FocusTask, 'findOneAndUpdate').mockResolvedValue({ _id: mockTaskId } as any);
      
      (jest.spyOn(FocusTask, 'find') as any).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn(() => Promise.resolve([] as any)),
        }),
      });

      jest.spyOn(FocusSession, 'find').mockResolvedValue([]);

      await focusController.updateTask(mockReq, mockRes);

      expect(FocusTask.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockTaskId, userId: mockUserId },
        { $set: mockReq.body },
        { new: true }
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task and return updated dashboard', async () => {
      mockReq.params.id = mockTaskId;

      const mockUser = { _id: mockUserId, streak: { current: 1 }, timezone: 'UTC' };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      
      jest.spyOn(FocusTask, 'findOneAndDelete').mockResolvedValue({ _id: mockTaskId } as any);
      
      (jest.spyOn(FocusTask, 'find') as any).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn(() => Promise.resolve([] as any)),
        }),
      });

      jest.spyOn(FocusSession, 'find').mockResolvedValue([]);

      await focusController.deleteTask(mockReq, mockRes);

      expect(FocusTask.findOneAndDelete).toHaveBeenCalledWith({ _id: mockTaskId, userId: mockUserId });
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });

  describe('recordSession', () => {
    it('should record focus session, award XP to user, and increment task completed pomodoros', async () => {
      mockReq.body = {
        taskId: mockTaskId,
        type: 'focus',
        durationMinutes: 25,
      };

      const mockUser = { _id: mockUserId, streak: { current: 1 }, timezone: 'UTC' };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      
      jest.spyOn(FocusSession, 'create').mockResolvedValue({} as any);
      jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue({} as any);
      jest.spyOn(FocusTask, 'findOneAndUpdate').mockResolvedValue({} as any);

      (jest.spyOn(FocusTask, 'find') as any).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn(() => Promise.resolve([] as any)),
        }),
      });

      jest.spyOn(FocusSession, 'find').mockResolvedValue([]);

      await focusController.recordSession(mockReq, mockRes);

      expect(FocusSession.create).toHaveBeenCalledWith({
        userId: mockUserId,
        taskId: mockTaskId,
        type: 'focus',
        durationMinutes: 25,
      });

      // Award +40 XP
      // @ts-ignore
      expect(global.__MOCK_AWARD_XP__).toHaveBeenCalledWith(mockUserId, 40, 'focus_session');
      
      // Increment task pomodoro completion
      expect(FocusTask.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockTaskId, userId: mockUserId },
        { $inc: { completedPomodoros: 1 } }
      );

      expect(mockRes.status).toHaveBeenCalledWith(201);
    });
  });
});
