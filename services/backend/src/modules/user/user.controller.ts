import { Request, Response } from 'express';
import User from './user.model.js';
import bcrypt from 'bcrypt';
import { NotFoundError, BadRequestError } from '../../utils/errors.js';
import {v2 as cloudinary } from 'cloudinary';
import SubjectProgress from '../subjects/subjectProgress.model.js';
import QuizResult from '../quizzes/quizResult.model.js';

export const getAllUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = req.query.search as string;
  const skip = (page - 1) * limit;

  // @ts-ignore
  const userRole = req.user?.role;

  // Define fields dependent on role
  let selectFields = '-password'; // Default: Exclude password only (Super Admin gets everything else)

  if (userRole === 'admin') {
    // Admins get PII restricted view
    // Explicitly Allow: Name, Email, Role, Verified, Provider, CreatedAt, IDs
    // Implicitly Deny: Phone, Address, IP logs (if added in future)
    selectFields = '_id name email role isVerified provider createdAt streak'; 
  }

  const query: any = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const users = await User.find(query)
    .select(selectFields)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(query);
  
  // Calculate Global Stats (uncoupled from search query)
  const activeCount = await User.countDocuments({ isVerified: true });
  const adminsCount = await User.countDocuments({ role: { $in: ['admin', 'super-admin'] } });

  res.status(200).json({
    users,
    total,
    activeCount,
    adminsCount,
    page,
    pages: Math.ceil(total / limit),
  });
};

export const getGuestLeads = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;
  const skip = (page - 1) * limit;

  const query = { role: 'guest'};

  const guests = await User.find(query).select('_id name email isVerified createdAt').sort({ createdAt: -1}).skip(skip).limit(limit);

  const total = await User.countDocuments(query);

  res.status(200).json({
    guests,
    total,
    page,
    pages: Math.ceil(total / limit),
  }); 
}

export const getAdmins = async (req: Request, res: Response) => {
  const admins = await User.find({
    role: { $in: ['admin', 'super-admin'] }
  }).select('name email role isVerified');

  res.status(200).json({ admins });
};

export const createAdmin = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, role, password } = req.body;

  if (!name || !email || !role || !password) {
    throw new BadRequestError('Missing required fields');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('An account with this email already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    phoneNumber,
    role,
    password: hashedPassword,
    isVerified: true, // Manual creation skips email verification loops
  });

  res.status(201).json({ message: 'Admin created successfully', admin: newUser });
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['user', 'admin', 'super-admin'].includes(role)) {
    throw new BadRequestError('Invalid role. Must be "user", "admin", or "super-admin".');
  }

  // Prevent self-demotion/role change
  // @ts-ignore
  if (req.user?.userId === id) {
     throw new BadRequestError('You cannot change your own role.');
  }

  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    throw new NotFoundError('User not found');
  }

  res.status(200).json({ message: 'User role updated', user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  res.status(200).json({ message: 'User deleted successfully' });
};

export const toggleUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Prevent self-freezing
  // @ts-ignore
  if (req.user?.userId === id) {
     throw new BadRequestError('You cannot freeze your own account.');
  }

  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError('User not found');
  }

  user.isFrozen = !user.isFrozen;
  await user.save();

  res.status(200).json({ 
    message: `User ${user.isFrozen ? 'frozen' : 'activated'} successfully`, 
    user: { _id: user._id, isFrozen: user.isFrozen } 
  });
};

export const updateProfile = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { name, timezone, phoneNumber, username, bio } = req.body;

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User not found');

  if (name) user.name = name;
  if (timezone) user.timezone = timezone;
  if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
  if (bio !== undefined) user.bio = bio;

  if (username !== undefined) {
    if (username !== user.username) {
      const existing = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
      if (existing) {
        throw new BadRequestError('Username is already taken');
      }
      user.username = username;
    }
  }

  await user.save();

  res.json({ message: 'Profile updated successfully', user });
};

export const uploadProfilePhoto = async (req: Request, res: Response) => {
  /* #swagger.requestBody = {
       required: true,
       content: {
         "multipart/form-data": {
           schema: {
             type: "object",
             properties: {
               photo: {
                 type: "string",
                 format: "binary"
               }
             },
             required: ["photo"]
           }
         }
       }
     } */
  // @ts-ignore
  const userId = req.user.userId;

  if (!req.file) {
    throw new BadRequestError('No image file provided');
  }

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User not found');

  if (user.profilePhoto) {
  try {
    const urlParts = user.profilePhoto.split('/');
    const filename = urlParts[urlParts.length - 1];
    const publicId = 'vormirex/profiles/' + filename.split('.')[0];
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.warn('[Cloudinary] Failed to delete old profile photo:', err);
    // Non-fatal: continue with upload
  }
  }
  // Cloudinary storage engine puts the URL in req.file.path
  user.profilePhoto = req.file.path;
  await user.save();

  res.json({ message: 'Profile photo uploaded successfully', profilePhoto: user.profilePhoto });
};

export const removeProfilePhoto = async (req: Request, res: Response) => {
  // @ts-ignore 
  const userId = req.user.userId;
  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User not found');

  if(!user.profilePhoto){
    throw new BadRequestError('No profile photo found');
  }
  try {
    const urlParts = user.profilePhoto.split('/');
    const filename = urlParts[urlParts.length - 1];
    const publicId = 'vormirex/profiles/' + filename.split('.')[0];
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.warn('[Cloudinary] Could not delete photo asset:', err);
  }
  user.profilePhoto = undefined; // always runs
  await user.save();
  res.json({ message: 'Profile photo removed successfully' });
}

export const changePassword = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(userId).select('+password');
  if (!user) throw new NotFoundError('User not found');

  if (user.provider === 'google') {
    throw new BadRequestError('Google-authenticated users cannot change password.');
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password!);
  if (!isMatch) throw new BadRequestError('Incorrect current password.');

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: 'Password changed successfully' });
};

export const deleteAccount = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;

  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new NotFoundError('User not found');

  res.json({ message: 'Account deleted successfully' });

};

export const updatePreferences = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { dailyGoal, focusAreas } = req.body;

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User not found');

  // Initialize if missing (for legacy docs)
  if (!user.learningPreferences) {
    user.learningPreferences = { dailyGoal: 30, focusAreas: [], selectedSubjects: [] };
  }

  if (dailyGoal !== undefined) user.learningPreferences.dailyGoal = dailyGoal;
  if (focusAreas !== undefined) user.learningPreferences.focusAreas = focusAreas;
  // @ts-ignore
  if (req.body.primaryFocus !== undefined) user.learningPreferences.primaryFocus = req.body.primaryFocus;
  // @ts-ignore
  if (req.body.curiosity !== undefined) user.learningPreferences.curiosity = req.body.curiosity;
  // @ts-ignore
  if (req.body.learningPace !== undefined) user.learningPreferences.learningPace = req.body.learningPace;
  // @ts-ignore
  if (req.body.learningFormat !== undefined) user.learningPreferences.learningFormat = req.body.learningFormat;
  // @ts-ignore
  if (req.body.challengeLevel !== undefined) user.learningPreferences.challengeLevel = req.body.challengeLevel;
  // @ts-ignore
  if (req.body.learningGoals !== undefined) user.learningPreferences.learningGoals = req.body.learningGoals;
  // @ts-ignore
  if (req.body.currentSkillLevel !== undefined) user.learningPreferences.currentSkillLevel = req.body.currentSkillLevel;
  // @ts-ignore
  if (req.body.timeline !== undefined) user.learningPreferences.timeline = req.body.timeline;

  user.markModified('learningPreferences');
  await user.save();

  res.json({ message: 'Preferences updated', preferences: user.learningPreferences });
};

export const updateNotificationPreferences = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const {
    dailyStudyReminders,
    xpAchievementAlerts,
    streakReminders,
    leaderboardUpdates,
    newContentAlerts,
    emailDigest,
    newCourseAlerts,
    securityAlerts,
  } = req.body;

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User not found');

  // Initialize if missing
  if (!user.notificationPreferences) {
    user.notificationPreferences = { 
      dailyStudyReminders: true,
      xpAchievementAlerts: true,
      streakReminders: true,
      leaderboardUpdates: true,
      newContentAlerts: true,
      emailDigest: true,
      newCourseAlerts: true,
      securityAlerts: true 
    };
  }

  if (dailyStudyReminders !== undefined) user.notificationPreferences.dailyStudyReminders = dailyStudyReminders;
  if (xpAchievementAlerts !== undefined) user.notificationPreferences.xpAchievementAlerts = xpAchievementAlerts;
  if (streakReminders !== undefined) user.notificationPreferences.streakReminders = streakReminders;
  if (leaderboardUpdates !== undefined) user.notificationPreferences.leaderboardUpdates = leaderboardUpdates;
  if (newContentAlerts !== undefined) user.notificationPreferences.newContentAlerts = newContentAlerts;
  if (emailDigest !== undefined) user.notificationPreferences.emailDigest = emailDigest;
  if (newCourseAlerts !== undefined) user.notificationPreferences.newCourseAlerts = newCourseAlerts;
  if (securityAlerts !== undefined) user.notificationPreferences.securityAlerts = securityAlerts;

  await user.save();

  res.json({ message: 'Notification preferences updated', preferences: user.notificationPreferences });
};

export const updatePrivacySettings = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { isProfilePublic, showProgress, showCourses } = req.body;

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User not found');

  if (!user.privacySettings) {
    user.privacySettings = { isProfilePublic: true, showProgress: true, showCourses: true };
  }

  if (isProfilePublic !== undefined) user.privacySettings.isProfilePublic = isProfilePublic;
  if (showProgress !== undefined) user.privacySettings.showProgress = showProgress;
  if (showCourses !== undefined) user.privacySettings.showCourses = showCourses;

  await user.save();
  res.json({ message: 'Privacy settings updated', privacySettings: user.privacySettings });
};

export const updateUiPreferences = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { theme, fontSize, compactSidebar, reducedAnimations, accentColor } = req.body;

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User not found');

  if (!user.preferences) {
    user.preferences = {
      theme: 'dark',
      fontSize: 'medium',
      compactSidebar: false,
      reducedAnimations: false,
      accentColor: 'blue-indigo',
    };
  }

  if (theme !== undefined) user.preferences.theme = theme;
  if (fontSize !== undefined) user.preferences.fontSize = fontSize;
  if (compactSidebar !== undefined) user.preferences.compactSidebar = compactSidebar;
  if (reducedAnimations !== undefined) user.preferences.reducedAnimations = reducedAnimations;
  if (accentColor !== undefined) user.preferences.accentColor = accentColor;

  user.markModified('preferences');
  await user.save();

  res.json({ message: 'UI preferences updated', preferences: user.preferences });
};

export const getPublicProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).select('name role createdAt streak learningPreferences privacySettings');

  if (!user) throw new NotFoundError('User not found');

  // Default to public if settings missing
  const isPublic = user.privacySettings?.isProfilePublic ?? true;

  if (!isPublic) {
    // If private, only admins or yourself can see (simplified: just block for now)
    // @ts-ignore
    const currentUserId = req.user?.userId;
    // @ts-ignore
    const isAdmin = req.user?.role === 'admin' || req.user?.role === 'super-admin';
    
    if (currentUserId !== id && !isAdmin) {
      throw new NotFoundError('User profile is private'); // Generic error to avoid leaking existence
    }
  }

  // Filter data based on privacy flags
  const responseData: any = {
    _id: user._id,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
    privacySettings: user.privacySettings,
  };

  if (user.privacySettings?.showProgress) {
    responseData.streak = user.streak;
  }

  if (user.privacySettings?.showCourses) {
    // Logic to fetch course progress/enrollments would go here
    // responseData.enrolledCourses = ...
  }

  res.json({ profile: responseData });
};

export const getProfilePageData = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User not found');

  // 1. Calculate stats
  const progressEntries = await SubjectProgress.find({ userId });
  let totalStudyTimeSec = 0;
  for (const entry of progressEntries) {
    totalStudyTimeSec += entry.totalStudyTimeSeconds || 0;
  }
  const totalStudyHours = Math.round((totalStudyTimeSec / 3600) * 10) / 10;

  const activeSubjects = progressEntries.length > 0 ? progressEntries.length : 3;

  // 2. Count quizzes for badges
  const quizCount = await QuizResult.countDocuments({ userId });

  // 3. Define badges
  const badges = [
    { id: '10-day-streak', name: '10-Day Streak', icon: '🔥', description: 'Maintain a 10-day study streak', unlocked: (user.streak?.longest || 0) >= 10 || (user.streak?.current || 0) >= 10 },
    { id: 'quiz-master', name: 'Quiz Master', icon: '🎯', description: 'Complete 3 or more quizzes', unlocked: quizCount >= 3 },
    { id: 'fast-learner', name: 'Fast Learner', icon: '📚', description: 'Complete lessons efficiently', unlocked: true },
    { id: 'ai-explorer', name: 'AI Explorer', icon: '💬', description: 'Interact with the AI Tutor', unlocked: true },
    { id: 'top-student', name: 'Top Student', icon: '⭐', description: 'Perform in the top 5%', unlocked: false },
    { id: 'science-buff', name: 'Science Buff', icon: '🔬', description: 'Complete science courses', unlocked: false },
    { id: '100-day-streak', name: '100-Day Streak', icon: '🏅', description: 'Maintain a 100-day study streak', unlocked: false },
    { id: 'legend', name: 'Legend', icon: '👑', description: 'Earn 10,000 XP', unlocked: (user.xp || 0) >= 10000 },
  ];

  // 4. Calculate topics to improve
  const quizResults = await QuizResult.find({ userId }).populate('subjectId');
  const topicsToImprove = [];
  if (quizResults.length > 0) {
    const weakScores = quizResults.filter(q => q.score < 70);
    for (const q of weakScores) {
      const subject = q.subjectId as any;
      topicsToImprove.push({
        topic: subject?.title || 'Practice Topic',
        percent: q.score,
      });
    }
  }
  if (topicsToImprove.length === 0) {
    topicsToImprove.push(
      { topic: 'Integration by Parts', percent: 52 },
      { topic: 'Python Decorators', percent: 58 },
      { topic: 'Quantum Mechanics', percent: 64 }
    );
  }

  // 5. Define AI Insights
  const insights = [
    {
      type: 'percentile',
      text: `You're in the top 5% of learners this week! Your consistency is impressive — you haven't missed a single day in ${user.streak?.current || 12} days.`,
    },
    {
      type: 'strength',
      text: 'Strength: You excel at theoretical concepts and multiple-choice questions.',
    },
    {
      type: 'opportunity',
      text: 'Opportunity: Practice more applied problems in integration. Your concept understanding is strong but application needs work.',
    },
    {
      type: 'prediction',
      text: 'Prediction: At your current pace, you\'ll complete the Calculus course in 3 weeks.',
    }
  ];

  const responseData = {
    user: {
      name: user.name,
      email: user.email,
      username: user.username || '',
      bio: user.bio || '',
      profilePhoto: user.profilePhoto || '',
      isPro: user.isPro || false,
      streak: user.streak?.current || 0,
      level: Math.floor(user.xp / 350) + 1,
      percentile: 'Top 5%',
    },
    stats: {
      totalStudyTime: totalStudyHours > 0 ? totalStudyHours : 124,
      dayStreak: user.streak?.current || 0,
      activeSubjects,
      xpPoints: user.xp || 0,
    },
    badges,
    topicsToImprove,
    insights,
  };

  res.status(200).json(responseData);
};

export default {
  getAllUsers,
  getGuestLeads,
  updateUserRole,
  deleteUser,
  getAdmins,
  createAdmin,
  toggleUserStatus,
  updateProfile,
  uploadProfilePhoto,
  removeProfilePhoto,
  changePassword,
  deleteAccount,
  updatePreferences,
  updateNotificationPreferences,
  updatePrivacySettings,
  updateUiPreferences,
  getPublicProfile,
  getProfilePageData,
};
