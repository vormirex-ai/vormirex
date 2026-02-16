import { Request, Response } from 'express';
import Notification from './notification.model.js';
import { NotFoundError } from '../../utils/errors.js';

export const getNotifications = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const skip = (page - 1) * limit;

  const notifications = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Notification.countDocuments({ userId });
  const unreadCount = await Notification.countDocuments({ userId, isRead: false });

  res.status(200).json({
    notifications,
    total,
    unreadCount,
    page,
    pages: Math.ceil(total / limit),
  });
};

export const markAsRead = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { id } = req.params;

  const notification = await Notification.findOneAndUpdate(
    { _id: id, userId },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    throw new NotFoundError('Notification not found');
  }

  res.status(200).json({ message: 'Marked as read', notification });
};

export const markAllAsRead = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;

  await Notification.updateMany(
    { userId, isRead: false },
    { isRead: true }
  );

  res.status(200).json({ message: 'All notifications marked as read' });
};

// Internal utility to create notification (not exposed as route yet, but ready for use)
export const createNotification = async (
  userId: string,
  type: 'info' | 'success' | 'warning' | 'error',
  title: string,
  message: string,
  metadata?: any
) => {
  return await Notification.create({ userId, type, title, message, metadata });
};

export default {
  getNotifications,
  markAsRead,
  markAllAsRead,
};
