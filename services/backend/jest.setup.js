import { jest } from '@jest/globals';

// Globally disable XP logs and Redis updates for other test suites by mocking awardXp
// @ts-ignore
global.__MOCK_AWARD_XP__ = () => {};

jest.mock('ioredis', () => {
  const mockPipeline = {
    zadd: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([]),
  };
  
  return {
    Redis: jest.fn().mockImplementation(() => {
      return {
        zcard: jest.fn().mockResolvedValue(0),
        zrevrange: jest.fn().mockResolvedValue([]),
        zscore: jest.fn().mockResolvedValue(null),
        zrevrank: jest.fn().mockResolvedValue(null),
        zincrby: jest.fn().mockResolvedValue('0'),
        expire: jest.fn().mockResolvedValue(1),
        pipeline: jest.fn().mockReturnValue(mockPipeline),
        on: jest.fn(),
        disconnect: jest.fn(),
      };
    }),
  };
});
