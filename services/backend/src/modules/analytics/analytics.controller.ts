import { Request, Response } from 'express';
import User from '../user/user.model.js';
import Course from '../courses/course.model.js';

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const publishedCourses = await Course.countDocuments({ status: 'PUBLISHED' });
    const draftCourses = await Course.countDocuments({ status: 'DRAFT' });

    // Mock revenue for now as we don't have orders yet
    const totalRevenue = 0; 

    res.status(200).json({
      users: {
        total: totalUsers,
      },
      courses: {
        total: totalCourses,
        published: publishedCourses,
        draft: draftCourses,
      },
      revenue: {
        total: totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error });
  }
};

export default {
  getStats,
};
