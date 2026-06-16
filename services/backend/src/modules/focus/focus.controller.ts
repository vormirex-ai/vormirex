import { Request, Response } from 'express';
import FocusTask from './focusTask.model.js';
import FocusSession from './focusSession.model.js';
import User from '../user/user.model.js';
import { NotFoundError } from '../../utils/errors.js';

// Helper to construct the unified dashboard response
const buildDashboardResponse = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const timezone = user.timezone || 'UTC';

  // Fetch active and completed tasks for the queue
  const tasks = await FocusTask.find({ userId })
    .populate('subjectId', 'title')
    .sort({ status: 1, order: 1, createdAt: -1 });

  // Calculate today's stats in user's local timezone
  // Retrieve sessions from the last 48 hours to be timezone-safe
  const last48Hours = new Date(Date.now() - 48 * 60 * 60 * 1000);
  const sessions = await FocusSession.find({
    userId,
    completedAt: { $gte: last48Hours },
  });

  const todayString = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  const todayFocusSessions = sessions.filter((s) => {
    const sDateStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(s.completedAt);
    return sDateStr === todayString && s.type === 'focus';
  });

  const sessionsToday = todayFocusSessions.length;
  const focusedTimeToday = todayFocusSessions.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const xpEarnedToday = sessionsToday * 40;
  const dayStreak = user.streak?.current || 0;

  return {
    stats: {
      sessionsToday,
      focusedTimeToday,
      xpEarnedToday,
      dayStreak,
    },
    tasks,
  };
};

export const getFocusDashboard = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const dashboard = await buildDashboardResponse(userId);
  res.status(200).json(dashboard);
};

export const createTask = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const {
    title,
    subjectId,
    taskType,
    description,
    estimatedPomodoros,
    dueDate,
    priority,
    tags,
    status,
    order,
  } = req.body;

  await FocusTask.create({
    userId,
    title,
    subjectId: subjectId || undefined,
    taskType,
    description,
    estimatedPomodoros,
    dueDate,
    priority,
    tags,
    status,
    order,
  });

  const dashboard = await buildDashboardResponse(userId);
  res.status(201).json({ message: 'Task created', ...dashboard });
};

export const updateTask = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { id } = req.params;

  const task = await FocusTask.findOneAndUpdate(
    { _id: id, userId },
    { $set: req.body },
    { new: true }
  );

  if (!task) {
    throw new NotFoundError('Task not found');
  }

  const dashboard = await buildDashboardResponse(userId);
  res.status(200).json({ message: 'Task updated', ...dashboard });
};

export const deleteTask = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { id } = req.params;

  const task = await FocusTask.findOneAndDelete({ _id: id, userId });
  if (!task) {
    throw new NotFoundError('Task not found');
  }

  const dashboard = await buildDashboardResponse(userId);
  res.status(200).json({ message: 'Task deleted', ...dashboard });
};

export const recordSession = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { taskId, type, durationMinutes } = req.body;

  if (!type || !durationMinutes) {
    return res.status(400).json({ error: 'Missing session type or duration' });
  }

  // Record the session
  const session = await FocusSession.create({
    userId,
    taskId: taskId || undefined,
    type,
    durationMinutes,
  });

  // Gamification: Award +40 XP for completed focus intervals
  if (type === 'focus') {
    await User.findByIdAndUpdate(userId, { $inc: { xp: 40 } });

    // If working on a specific task, increment its completed pomodoros count
    if (taskId) {
      await FocusTask.findOneAndUpdate(
        { _id: taskId, userId },
        { $inc: { completedPomodoros: 1 } }
      );
    }
  }

  const dashboard = await buildDashboardResponse(userId);
  res.status(201).json({ message: 'Session recorded', session, ...dashboard });
};

export default {
  getFocusDashboard,
  createTask,
  updateTask,
  deleteTask,
  recordSession,
};
