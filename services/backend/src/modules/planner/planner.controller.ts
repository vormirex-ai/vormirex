import { Request, Response } from 'express';
import FocusTask from '../focus/focusTask.model.js';
import User from '../user/user.model.js';
import { NotFoundError, BadRequestError } from '../../utils/errors.js';

const buildPlannerDashboardResponse = async (userId: string, weekStartString?: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const timezone = user.timezone || 'UTC';

  let targetDate: Date;
  if (weekStartString) {
    targetDate = new Date(weekStartString);
    if (isNaN(targetDate.getTime())) {
      throw new BadRequestError('Invalid weekStart date format');
    }
  } else {
    targetDate = new Date();
  }

  // Find Monday of the targeted week in user's timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'long',
  });

  const parts = formatter.formatToParts(targetDate);
  const weekday = parts.find((p) => p.type === 'weekday')!.value;

  const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let dayIndex = weekdayNames.indexOf(weekday);
  if (dayIndex === -1) dayIndex = 0;

  const mondayDate = new Date(targetDate);
  mondayDate.setDate(targetDate.getDate() - dayIndex);
  mondayDate.setHours(0, 0, 0, 0);

  const daysInfo: any[] = [];
  const dateStrings: string[] = [];
  const dayAbbrevs = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  for (let i = 0; i < 7; i++) {
    const d = new Date(mondayDate);
    d.setDate(mondayDate.getDate() + i);

    const dateStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(d);

    dateStrings.push(dateStr);
    daysInfo.push({
      dayName: dayAbbrevs[i],
      dateString: dateStr,
      dayOfMonth: d.getDate(),
      tasks: [],
    });
  }

  // Query tasks within date boundaries to filter precisely afterwards
  const startRange = new Date(mondayDate);
  startRange.setDate(startRange.getDate() - 1);
  const endRange = new Date(mondayDate);
  endRange.setDate(endRange.getDate() + 8);

  const tasks = await FocusTask.find({
    userId,
    date: { $gte: startRange, $lte: endRange },
  }).populate('subjectId', 'title');

  // Map tasks to their formatted date strings
  const weeklyTasks = daysInfo.map((day) => {
    const dayTasks = tasks.filter((t) => {
      if (!t.date) return false;
      const tDateStr = new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(t.date);
      return tDateStr === day.dateString;
    });

    return {
      ...day,
      tasks: dayTasks.map((t) => ({
        _id: t._id,
        title: t.title,
        status: t.status,
        durationMinutes: t.durationMinutes,
        xpAwarded: t.xpAwarded,
        taskType: t.taskType,
        priority: t.priority,
        subject: t.subjectId ? (t.subjectId as any).title : undefined,
      })),
    };
  });

  const weekTasksFlat = tasks.filter((t) => {
    if (!t.date) return false;
    const tDateStr = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(t.date);
    return dateStrings.includes(tDateStr);
  });

  const completedTasks = weekTasksFlat.filter((t) => t.status === 'completed');
  const pendingTasks = weekTasksFlat.filter((t) => t.status !== 'completed' && t.status !== 'skipped');

  const completedCount = completedTasks.length;
  const pendingCount = pendingTasks.length;

  const totalDurationMinutes = completedTasks.reduce((acc, curr) => acc + (curr.durationMinutes || 0), 0);
  const studiedHours = Math.round((totalDurationMinutes / 60) * 10) / 10;

  const totalActiveTasks = completedCount + pendingCount;
  const weekGoal = totalActiveTasks > 0 ? Math.round((completedCount / totalActiveTasks) * 100) : 0;

  const completedList = completedTasks.map((t) => ({
    _id: t._id,
    title: t.title,
    status: t.status,
    durationMinutes: t.durationMinutes,
    xpAwarded: t.xpAwarded,
    date: t.date,
  }));

  const upcomingList = pendingTasks.map((t) => ({
    _id: t._id,
    title: t.title,
    status: t.status,
    durationMinutes: t.durationMinutes,
    xpAwarded: t.xpAwarded,
    date: t.date,
  }));

  return {
    stats: {
      completed: completedCount,
      pending: pendingCount,
      studiedHours,
      weekGoal,
    },
    weeklyCalendar: weeklyTasks,
    completedTasks: completedList,
    upcomingTasks: upcomingList,
  };
};

export const getPlannerDashboard = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { weekStart } = req.query;

  const dashboard = await buildPlannerDashboardResponse(userId, weekStart as string);
  res.status(200).json(dashboard);
};

export const createTask = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const {
    title,
    date,
    durationMinutes,
    subjectId,
    xpAwarded,
    taskType,
    description,
    priority,
    tags,
    status,
  } = req.body;

  if (!title || !date) {
    throw new BadRequestError('Title and Date are required');
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new BadRequestError('Invalid date format');
  }

  await FocusTask.create({
    userId,
    title,
    date: parsedDate,
    durationMinutes: durationMinutes !== undefined ? durationMinutes : 30,
    subjectId: subjectId || undefined,
    xpAwarded: xpAwarded !== undefined ? xpAwarded : 50,
    taskType: taskType || 'practice',
    description,
    priority: priority || 'medium',
    tags,
    status: status || 'upcoming',
  });

  const dashboard = await buildPlannerDashboardResponse(userId);
  res.status(201).json({ message: 'Planner task created', ...dashboard });
};

export const updateTask = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { id } = req.params;

  const task = await FocusTask.findOne({ _id: id, userId });
  if (!task) {
    throw new NotFoundError('Planner task not found');
  }

  // Gamification: Award XP upon completion
  if (req.body.status === 'completed' && task.status !== 'completed') {
    const xpAwardValue = task.xpAwarded !== undefined ? task.xpAwarded : 50;
    await User.findByIdAndUpdate(userId, { $inc: { xp: xpAwardValue } });
  }

  // Handle date formatting if it is being updated
  if (req.body.date) {
    const parsedDate = new Date(req.body.date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestError('Invalid date format');
    }
    req.body.date = parsedDate;
  }

  await FocusTask.updateOne({ _id: id, userId }, { $set: req.body });

  const dashboard = await buildPlannerDashboardResponse(userId);
  res.status(200).json({ message: 'Planner task updated', ...dashboard });
};

export const deleteTask = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { id } = req.params;

  const result = await FocusTask.deleteOne({ _id: id, userId });
  if (result.deletedCount === 0) {
    throw new NotFoundError('Planner task not found');
  }

  const dashboard = await buildPlannerDashboardResponse(userId);
  res.status(200).json({ message: 'Planner task deleted', ...dashboard });
};

export default {
  getPlannerDashboard,
  createTask,
  updateTask,
  deleteTask,
};
