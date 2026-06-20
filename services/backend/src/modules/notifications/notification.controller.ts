import { Request, Response } from 'express';
import Notification from './notification.model.js';
import User from '../user/user.model.js';
import { NotFoundError } from '../../utils/errors.js';
import { notificationEmitter } from './notification.emitter.js';

export const getNotifications = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const skip = (page - 1) * limit;
  const type = req.query.type as string;

  const query: any = { userId };
  if (type) {
    query.type = type;
  }

  const notifications = await Notification.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Notification.countDocuments(query);
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

export const streamNotifications = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Keep-alive heartbeat every 15s to keep connection open
  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 15000);

  const onNotification = (notification: any) => {
    if (notification.userId.toString() === userId.toString()) {
      res.write(`data: ${JSON.stringify(notification)}\n\n`);
    }
  };

  notificationEmitter.on('new_notification', onNotification);

  req.on('close', () => {
    clearInterval(heartbeat);
    notificationEmitter.off('new_notification', onNotification);
    res.end();
  });
};

export const getNotificationStats = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;

  const total = await Notification.countDocuments({ userId });
  const unreadCount = await Notification.countDocuments({ userId, isRead: false });
  const achievementsCount = await Notification.countDocuments({ userId, type: 'achievement' });
  const remindersCount = await Notification.countDocuments({ userId, type: 'reminder' });

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const notificationsThisWeek = await Notification.countDocuments({
    userId,
    createdAt: { $gte: sevenDaysAgo },
  });

  const lessonsCompletedCount = await Notification.countDocuments({
    userId,
    type: 'lesson',
  });

  const xpNotifications = await Notification.find({
    userId,
    type: 'achievement',
    'metadata.xpEarned': { $exists: true },
  });
  const xpEarned = xpNotifications.reduce((acc, curr) => acc + (curr.metadata?.xpEarned || 0), 0);

  res.status(200).json({
    total,
    unreadCount,
    achievementsCount,
    remindersCount,
    insights: {
      notificationsThisWeek,
      lessonsCompletedCount,
      xpEarned,
    },
  });
};

export const clearHistory = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;

  await Notification.deleteMany({ userId });

  res.status(200).json({ message: 'Notification history cleared' });
};

export const exportActivity = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;

  const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

  const format = req.query.format as string;
  if (format === 'csv') {
    let csv = 'ID,Type,Title,Message,Read,Created At\n';
    for (const n of notifications) {
      csv += `"${n._id}","${n.type}","${n.title.replace(/"/g, '""')}","${n.message.replace(/"/g, '""')}","${n.isRead}","${n.createdAt.toISOString()}"\n`;
    }
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=notification_history.csv');
    return res.status(200).send(csv);
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename=notification_history.json');
  res.status(200).json(notifications);
};

// Internal utility to create notification
export const createNotification = async (
  userId: string,
  type: 'achievement' | 'lesson' | 'reminder' | 'ai_recommendation' | 'system',
  title: string,
  message: string,
  metadata?: any
) => {
  const user = await User.findById(userId);
  if (user && user.notificationPreferences) {
    const prefs = user.notificationPreferences;
    let isEnabled = true;

    if (type === 'achievement' && prefs.xpAchievementAlerts === false) isEnabled = false;
    if (type === 'lesson' && prefs.newContentAlerts === false) isEnabled = false;
    
    if (type === 'reminder') {
      if (title.toLowerCase().includes('streak') && prefs.streakReminders === false) isEnabled = false;
      else if (prefs.dailyStudyReminders === false) isEnabled = false;
    }

    if (!isEnabled) {
      return null;
    }
  }

  const notification = await Notification.create({ userId, type, title, message, metadata });
  notificationEmitter.emit('new_notification', notification);
  return notification;
};

export default {
  getNotifications,
  markAsRead,
  markAllAsRead,
  streamNotifications,
  getNotificationStats,
  clearHistory,
  exportActivity,
};
