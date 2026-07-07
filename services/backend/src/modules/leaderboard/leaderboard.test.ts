import { jest, describe, it, expect, beforeEach, afterAll } from '@jest/globals';

// Mock ioredis entirely to prevent real network connections and open handles in Jest
jest.mock('ioredis', () => {
  const mockPipeline = {
    zadd: jest.fn().mockReturnThis(),
    exec: jest.fn(() => Promise.resolve([] as any)),
  };
  
  return {
    Redis: jest.fn().mockImplementation(() => {
      return {
        zcard: jest.fn(() => Promise.resolve(0)),
        zrevrange: jest.fn(() => Promise.resolve([] as any)),
        zscore: jest.fn(() => Promise.resolve(null)),
        zrevrank: jest.fn(() => Promise.resolve(null)),
        zincrby: jest.fn(() => Promise.resolve('0')),
        expire: jest.fn(() => Promise.resolve(1)),
        pipeline: jest.fn().mockReturnValue(mockPipeline),
        on: jest.fn(),
        disconnect: jest.fn(),
      };
    }),
  };
});

import * as leaderboardService from './leaderboard.service.js';
import User from '../user/user.model.js';
import XpLog from './xpLog.model.js';
import { redis } from '../../config/redis.js';

describe('Leaderboard Service Unit Tests', () => {
  const mockUserId = '60d0fe4f5311236168a109ca';
  const otherUserId = '60d0fe4f5311236168a109cb';

  beforeEach(() => {
    // @ts-ignore
    global.__MOCK_AWARD_XP__ = undefined;
    jest.restoreAllMocks();
    
    // Reset redis mocks
    jest.spyOn(redis, 'zcard').mockResolvedValue(0);
    jest.spyOn(redis, 'zrevrange').mockResolvedValue([] as any);
    jest.spyOn(redis, 'zscore').mockResolvedValue(null);
    jest.spyOn(redis, 'zrevrank').mockResolvedValue(null);
    jest.spyOn(redis, 'zincrby').mockResolvedValue('0');
    jest.spyOn(redis, 'expire').mockResolvedValue(1);
    
    const mockPipeline = {
      zadd: jest.fn().mockReturnThis(),
      exec: jest.fn(() => Promise.resolve([] as any)),
    };
    jest.spyOn(redis, 'pipeline').mockReturnValue(mockPipeline as any);
  });

  afterAll(async () => {
    await redis.disconnect();
  });

  describe('awardXp', () => {
    it('should update user XP in MongoDB and record in Redis sets', async () => {
      const mockUser = {
        _id: mockUserId,
        xp: 150,
      };

      const findByIdAndUpdateSpy = (jest.spyOn(User, 'findByIdAndUpdate') as any).mockResolvedValue(mockUser as any);
      const createSpy = (jest.spyOn(XpLog, 'create') as any).mockResolvedValue({} as any);
      const zincrbySpy = jest.spyOn(redis, 'zincrby').mockResolvedValue('100');
      const expireSpy = jest.spyOn(redis, 'expire').mockResolvedValue(1);

      await leaderboardService.awardXp(mockUserId, 100, 'focus_session');

      expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(mockUserId, { $inc: { xp: 100 } }, { new: true });
      expect(createSpy).toHaveBeenCalledWith({ userId: mockUserId, amount: 100, reason: 'focus_session' });
      
      expect(zincrbySpy).toHaveBeenCalledWith('leaderboard:alltime', 100, mockUserId);
      expect(zincrbySpy).toHaveBeenCalledWith(expect.stringContaining('leaderboard:weekly:'), 100, mockUserId);
      expect(zincrbySpy).toHaveBeenCalledWith(expect.stringContaining('leaderboard:monthly:'), 100, mockUserId);
      
      expect(expireSpy).toHaveBeenCalledTimes(2); // for weekly & monthly keys
    });

    it('should ignore non-positive XP awards', async () => {
      const findByIdAndUpdateSpy = jest.spyOn(User, 'findByIdAndUpdate') as any;
      await leaderboardService.awardXp(mockUserId, 0, 'focus_session');
      expect(findByIdAndUpdateSpy).not.toHaveBeenCalled();
    });
  });

  describe('getLeaderboardData', () => {
    it('should retrieve and enrich top rankings from Redis & MongoDB', async () => {
      const mockRedisRankings = [
        otherUserId, '1500',
        mockUserId, '1000'
      ];
      
      jest.spyOn(redis, 'zcard').mockResolvedValue(2);
      jest.spyOn(redis, 'zrevrange').mockResolvedValue(mockRedisRankings as any);
      jest.spyOn(redis, 'zscore').mockResolvedValue('1000');
      jest.spyOn(redis, 'zrevrank').mockResolvedValue(1); // 0-based rank index 1 (meaning 2nd place)

      const mockUsers = [
        {
          _id: otherUserId,
          name: 'James O\'Brien',
          username: 'james_ob',
          profilePhoto: 'avatar1.png',
          streak: { current: 16 }
        },
        {
          _id: mockUserId,
          name: 'Alex Johnson',
          username: 'alex_j',
          profilePhoto: 'avatar2.png',
          streak: { current: 12 }
        }
      ];

      // Mock User.find to support .select chain
      (jest.spyOn(User, 'find') as any).mockReturnValue({
        select: (jest.fn() as any).mockResolvedValue(mockUsers as any),
      } as any);

      (jest.spyOn(User, 'findById') as any).mockReturnValue({
        select: (jest.fn() as any).mockResolvedValue(mockUsers[1] as any),
      } as any);

      const result = await leaderboardService.getLeaderboardData('weekly', mockUserId);

      // Verify Redis queries were made
      expect(redis.zcard).toHaveBeenCalled();
      expect(redis.zrevrange).toHaveBeenCalled();

      // Verify correct enrichment of rankings
      expect(result.top3).toHaveLength(2); // Since there were only 2 users total
      expect(result.top3[0]).toEqual(expect.objectContaining({
        rank: 1,
        userId: otherUserId,
        name: 'James O\'Brien',
        xp: 1500,
        streak: 16
      }));

      // Verify current user details
      expect(result.userRank).toEqual(expect.objectContaining({
        rank: 2,
        name: 'Alex Johnson',
        xp: 1000,
        streak: 12
      }));
      expect(result.userPercentile).toBe('Top 100%'); // 2/2 is 100%
    });
  });
});
