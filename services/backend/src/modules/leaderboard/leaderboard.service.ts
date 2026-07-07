import User from '../user/user.model.js';
import XpLog from './xpLog.model.js';
import { redis } from '../../config/redis.js';

// Helper to get start of the current week (Monday 00:00 UTC)
export function getMondayOfCurrentWeek(): Date {
  const now = new Date();
  const day = now.getUTCDay();
  const diff = now.getUTCDate() - day + (day === 0 ? -6 : 1);
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), diff, 0, 0, 0, 0));
}

// Helper to get start of the current month (1st 00:00 UTC)
export function getStartOfCurrentMonth(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0));
}

// Helper to construct Weekly Redis key
export function getWeeklyKey(): string {
  const monday = getMondayOfCurrentWeek();
  const mondayStr = monday.toISOString().split('T')[0];
  return `leaderboard:weekly:${mondayStr}`;
}

// Helper to construct Monthly Redis key
export function getMonthlyKey(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  return `leaderboard:monthly:${year}-${month}`;
}

// Seeding mechanism for All-Time Leaderboard
export const ensureAllTimeLeaderboardSeeded = async () => {
  const allTimeKey = 'leaderboard:alltime';
  const size = await redis.zcard(allTimeKey);
  if (size === 0) {
    const users = await User.find({ xp: { $gt: 0 } }).select('_id xp');
    if (users.length > 0) {
      const pipeline = redis.pipeline();
      users.forEach((user) => {
        pipeline.zadd(allTimeKey, user.xp, user._id.toString());
      });
      await pipeline.exec();
    }
  }
};

// Seeding mechanism for dynamic timeframes (Weekly/Monthly) using XpLogs
export const ensureTimeframeLeaderboardSeeded = async (key: string, startDate: Date) => {
  const size = await redis.zcard(key);
  if (size === 0) {
    const logs = await XpLog.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $group: { _id: '$userId', totalXp: { $sum: '$amount' } } }
    ]);
    if (logs.length > 0) {
      const pipeline = redis.pipeline();
      logs.forEach((log) => {
        pipeline.zadd(key, log.totalXp, log._id.toString());
      });
      await pipeline.exec();
    }
  }
};

// Central function to award XP, log it in MongoDB, and update Redis Sorted Sets
export const awardXp = async (userId: string, amount: number, reason: string) => {
  if (amount <= 0) return;

  // @ts-ignore
  if (global.__MOCK_AWARD_XP__) {
    // @ts-ignore
    return global.__MOCK_AWARD_XP__(userId, amount, reason);
  }

  // 1. Update user's all-time XP in MongoDB User document
  const user = await User.findByIdAndUpdate(userId, { $inc: { xp: amount } }, { new: true });
  if (!user) return;

  // 2. Persist the XP transaction in MongoDB XpLog collection
  await XpLog.create({ userId, amount, reason });

  // 3. Update Redis Sorted Sets
  const weeklyKey = getWeeklyKey();
  const monthlyKey = getMonthlyKey();
  const allTimeKey = 'leaderboard:alltime';

  await redis.zincrby(allTimeKey, amount, userId.toString());
  await redis.zincrby(weeklyKey, amount, userId.toString());
  await redis.zincrby(monthlyKey, amount, userId.toString());

  // Set TTLs to auto-cleanup inactive keys
  await redis.expire(weeklyKey, 14 * 24 * 60 * 60); // 14 days
  await redis.expire(monthlyKey, 60 * 24 * 60 * 60); // 60 days
};

// Retrieve Leaderboard ranking data
export const getLeaderboardData = async (
  timeframe: 'weekly' | 'monthly' | 'all-time',
  userId: string
) => {
  let redisKey = 'leaderboard:alltime';

  // Make sure Redis has initialized caches
  if (timeframe === 'weekly') {
    const monday = getMondayOfCurrentWeek();
    redisKey = getWeeklyKey();
    await ensureTimeframeLeaderboardSeeded(redisKey, monday);
  } else if (timeframe === 'monthly') {
    const startOfMonth = getStartOfCurrentMonth();
    redisKey = getMonthlyKey();
    await ensureTimeframeLeaderboardSeeded(redisKey, startOfMonth);
  } else {
    await ensureAllTimeLeaderboardSeeded();
  }

  const totalUsers = await redis.zcard(redisKey);

  // Get top 100 users
  const rawRankings = await redis.zrevrange(redisKey, 0, 99, 'WITHSCORES');
  const parsedRankings: { userId: string; xp: number }[] = [];
  for (let i = 0; i < rawRankings.length; i += 2) {
    parsedRankings.push({
      userId: rawRankings[i],
      xp: parseInt(rawRankings[i + 1], 10),
    });
  }

  // Populate user profile info
  const topUserIds = parsedRankings.map((r) => r.userId);
  const users = await User.find({ _id: { $in: topUserIds } }).select('name username profilePhoto streak');
  const userMap = new Map(users.map((u) => [u._id.toString(), u]));

  const enrichedRankings = parsedRankings.map((rankInfo, index) => {
    const userDetail = userMap.get(rankInfo.userId);
    return {
      rank: index + 1,
      userId: rankInfo.userId,
      name: userDetail?.name || 'Anonymous User',
      username: userDetail?.username || '',
      profilePhoto: userDetail?.profilePhoto || '',
      streak: userDetail?.streak?.current || 0,
      xp: rankInfo.xp,
    };
  });

  // Calculate requesting user's rank, score, and percentile placement
  const userScoreRaw = await redis.zscore(redisKey, userId);
  const userRankRaw = await redis.zrevrank(redisKey, userId);

  let userRank = null;
  let userScore = 0;
  if (userScoreRaw !== null) {
    userScore = parseInt(userScoreRaw, 10);
    userRank = userRankRaw !== null ? userRankRaw + 1 : null;
  } else {
    if (timeframe === 'all-time') {
      const currentUser = await User.findById(userId).select('xp');
      userScore = currentUser?.xp || 0;
      userRank = (await User.countDocuments({ xp: { $gt: userScore } })) + 1;
    }
  }

  let userPercentile = 'Top 100%';
  if (userRank && totalUsers > 0) {
    const pct = (userRank / totalUsers) * 100;
    if (pct <= 5) userPercentile = 'Top 5%';
    else if (pct <= 10) userPercentile = 'Top 10%';
    else if (pct <= 25) userPercentile = 'Top 25%';
    else if (pct <= 50) userPercentile = 'Top 50%';
  }

  const top3 = enrichedRankings.slice(0, 3);
  const rankings = enrichedRankings.slice(3);

  const currentUserDetail = await User.findById(userId).select('name username profilePhoto streak');

  return {
    top3,
    rankings,
    userRank: {
      rank: userRank || totalUsers + 1,
      name: currentUserDetail?.name || 'You',
      username: currentUserDetail?.username || '',
      profilePhoto: currentUserDetail?.profilePhoto || '',
      streak: currentUserDetail?.streak?.current || 0,
      xp: userScore,
    },
    userPercentile,
  };
};
