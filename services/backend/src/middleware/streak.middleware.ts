import { Request, Response, NextFunction } from 'express';
import User from '../modules/user/user.model.js';
import { updateUserStreak } from '../utils/streak.js';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const streakMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Only run if user is authenticated
    if (!req.user || !req.user._id) {
      return next();
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (user) {
      await updateUserStreak(user);
    }
  } catch (error) {
    console.error('Error in streak middleware:', error);
  }

  next();
};
