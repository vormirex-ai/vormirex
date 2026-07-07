import { Request, Response } from 'express';
import { getLeaderboardData } from './leaderboard.service.js';

export const getLeaderboard = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const timeframe = (req.query.filter as 'weekly' | 'monthly' | 'all-time') || 'weekly';

  if (!['weekly', 'monthly', 'all-time'].includes(timeframe)) {
    return res.status(400).json({ error: "Invalid filter. Must be 'weekly', 'monthly', or 'all-time'." });
  }

  const leaderboardData = await getLeaderboardData(timeframe, userId);
  res.status(200).json(leaderboardData);
};

export default {
  getLeaderboard,
};
