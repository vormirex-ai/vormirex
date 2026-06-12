import { Request, Response, NextFunction } from 'express';
import dashboardService from './dashboard.service.js';

export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const data = await dashboardService.getDashboardData(userId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default { getDashboard };
