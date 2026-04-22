import { Request, Response } from 'express';
import User from '../user/user.model.js';
import Course from '../courses/course.model.js';
import os from 'os';
import mongoose from 'mongoose';

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    
    // NEW: Count only admins and super admins
    const activeAdmins = await User.countDocuments({ 
      role: { $in: ['admin', 'super-admin'] } 
    });
    
    // NEW: Calculate signups from the rolling 30-day window
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const newSignups = await User.countDocuments({ 
      createdAt: { $gte: thirtyDaysAgo } 
    });

    const totalCourses = await Course.countDocuments();
    const totalRevenue = 48200; // Mock revenue for now

    res.status(200).json({
      users: {
        total: totalUsers,
        new: newSignups,  // Added 
      },
      admins: {
        active: activeAdmins, // Added
      },
      courses: {
        total: totalCourses,
      },
      revenue: {
        total: totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error });
  }
};

export const getUserGrowth = async (req: Request, res: Response) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const growthData = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          users: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    // Shape the data for the React Chart: [{ month: "Jan", users: 15 }]
    const formattedData = growthData.map((data) => {
      const date = new Date(data._id.year, data._id.month - 1);
      return {
        month: date.toLocaleString('default', { month: 'short' }),
        users: data.users,
      };
    });

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user growth', error });
  }
};

export const getSystemHealth = async (req: Request, res: Response) => {
  try {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMemPercent = ((totalMem - freeMem) / totalMem) * 100;
    
    // Uptime formatting
    const uptimeSeconds = process.uptime(); 
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    
    // 0 = disconnected, 1 = connected
    const dbStatus = mongoose.connection.readyState === 1 ? 'OK' : 'ERROR';

    res.status(200).json({
      serverStatus: dbStatus === 'OK' && usedMemPercent < 90 ? 'OK' : 'WARNING',
      uptime: `${hours}h ${minutes}m`,
      alerts: usedMemPercent > 90 ? 1 : 0,
      database: dbStatus,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching system health', error });
  }
};




export default {
  getStats,
  getUserGrowth,
  getSystemHealth
};
