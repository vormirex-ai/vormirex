import { Request, Response } from 'express';
import User from './user.model.js';
import bcrypt from 'bcrypt';
import { NotFoundError, BadRequestError } from '../../utils/errors.js';
import {v2 as cloudinary } from 'cloudinary';

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
  const { name, timezone, phoneNumber } = req.body;

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User not found');

  if (name) user.name = name;
  if (timezone) user.timezone = timezone;
  if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

  await user.save();

  res.json({ message: 'Profile updated successfully', user });
};

export const uploadProfilePhoto = async (req: Request, res: Response) => {
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
    user.learningPreferences = { dailyGoal: 30, focusAreas: [] };
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
  const { streakReminders, newCourseAlerts, securityAlerts } = req.body;

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User not found');

  // Initialize if missing
  if (!user.notificationPreferences) {
    user.notificationPreferences = { 
      streakReminders: true, 
      newCourseAlerts: true, 
      securityAlerts: true 
    };
  }

  if (streakReminders !== undefined) user.notificationPreferences.streakReminders = streakReminders;
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
  getPublicProfile,
};
