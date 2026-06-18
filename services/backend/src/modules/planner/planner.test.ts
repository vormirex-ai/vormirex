import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import plannerController from './planner.controller.js';
import FocusTask from '../focus/focusTask.model.js';
import User from '../user/user.model.js';

describe('Planner Controller Unit Tests', () => {
  const mockUserId = '60d0fe4f5311236168a109ca';
  const mockTaskId = '60d0fe4f5311236168a109cb';
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

  describe('getPlannerDashboard', () => {
    it('should calculate weekly stats and group tasks day-by-day in the user timezone', async () => {
      const mockUser = {
        _id: mockUserId,
        timezone: 'UTC',
      };

      const mockTasks = [
        {
          _id: mockTaskId,
          title: 'Calculus Integration',
          status: 'completed',
          durationMinutes: 45,
          xpAwarded: 80,
          date: new Date('2026-06-22T10:00:00Z'), // Monday
          populate: jest.fn().mockReturnThis(),
        },
        {
          title: 'OOP Python',
          status: 'upcoming',
          durationMinutes: 40,
          xpAwarded: 50,
          date: new Date('2026-06-24T12:00:00Z'), // Wednesday
          populate: jest.fn().mockReturnThis(),
        },
      ];

      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      (jest.spyOn(FocusTask, 'find') as any).mockReturnValue({
        populate: jest.fn(() => Promise.resolve(mockTasks as any)),
      });

      // Request Monday of target week
      mockReq.query.weekStart = '2026-06-22';

      await plannerController.getPlannerDashboard(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          stats: expect.objectContaining({
            completed: 1,
            pending: 1,
            studiedHours: 0.8, // 45 / 60
            weekGoal: 50,      // (1/2) * 100
          }),
          weeklyCalendar: expect.any(Array),
          completedTasks: expect.any(Array),
          upcomingTasks: expect.any(Array),
        })
      );
    });
  });

  describe('createTask', () => {
    it('should create a planner task and return the updated dashboard', async () => {
      const mockUser = { _id: mockUserId, timezone: 'UTC' };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(FocusTask, 'create').mockResolvedValue({} as any);
      (jest.spyOn(FocusTask, 'find') as any).mockReturnValue({
        populate: jest.fn(() => Promise.resolve([] as any)),
      });

      mockReq.body = {
        title: 'New Math Task',
        date: '2026-06-23',
        durationMinutes: 50,
        xpAwarded: 100,
      };

      await plannerController.createTask(mockReq, mockRes);

      expect(FocusTask.create).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New Math Task',
          durationMinutes: 50,
          xpAwarded: 100,
        })
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Planner task created',
          stats: expect.any(Object),
        })
      );
    });
  });

  describe('updateTask', () => {
    it('should update task details and award XP if completed', async () => {
      const mockUser = { _id: mockUserId, timezone: 'UTC' };
      const mockTask = {
        _id: mockTaskId,
        title: 'Review Trigonometry',
        status: 'upcoming',
        xpAwarded: 60,
      };

      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(FocusTask, 'findOne').mockResolvedValue(mockTask as any);
      jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue({} as any);
      jest.spyOn(FocusTask, 'updateOne').mockResolvedValue({} as any);
      (jest.spyOn(FocusTask, 'find') as any).mockReturnValue({
        populate: jest.fn(() => Promise.resolve([] as any)),
      });

      mockReq.params.id = mockTaskId;
      mockReq.body = { status: 'completed' };

      await plannerController.updateTask(mockReq, mockRes);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        mockUserId,
        { $inc: { xp: 60 } }
      );
      expect(FocusTask.updateOne).toHaveBeenCalledWith(
        { _id: mockTaskId, userId: mockUserId },
        { $set: { status: 'completed' } }
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });

  describe('deleteTask', () => {
    it('should delete task and return dashboard', async () => {
      const mockUser = { _id: mockUserId, timezone: 'UTC' };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(FocusTask, 'deleteOne').mockResolvedValue({ deletedCount: 1 } as any);
      (jest.spyOn(FocusTask, 'find') as any).mockReturnValue({
        populate: jest.fn(() => Promise.resolve([] as any)),
      });

      mockReq.params.id = mockTaskId;

      await plannerController.deleteTask(mockReq, mockRes);

      expect(FocusTask.deleteOne).toHaveBeenCalledWith({ _id: mockTaskId, userId: mockUserId });
      expect(mockRes.status).toHaveBeenCalledWith(200);
    });
  });
});
