import { Request, Response } from 'express';
import User from './user.model.js';
import bcrypt from 'bcrypt';
import { NotFoundError, BadRequestError } from '../../utils/errors.js';

export const getAllUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
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

  const users = await User.find()
    .select(selectFields)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  res.status(200).json({
    users,
    total,
    page,
    pages: Math.ceil(total / limit),
  });
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!['user', 'admin', 'super-admin'].includes(role)) {
    throw new BadRequestError('Invalid role. Must be "user", "admin", or "super-admin".');
  }

  // Prevent self-demotion/role change
  // @ts-ignore
  if (req.user?._id.toString() === id) {
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

export const getAdmins = async (req: Request, res: Response) => {
  // @ts-ignore
  const currentUserId = req.user?._id;

  const admins = await User.find({
    role: 'admin',
    _id: { $ne: currentUserId },
  }).select('name email role isVerified');

  res.status(200).json({ admins });
};

export const toggleUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Prevent self-freezing
  // @ts-ignore
  if (req.user?._id.toString() === id) {
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
  const userId = req.user._id;
  const { name, timezone } = req.body;

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User not found');

  if (name) user.name = name;
  if (timezone) user.timezone = timezone;

  await user.save();

  res.json({ message: 'Profile updated successfully', user });
};

export const changePassword = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user._id;
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
  const userId = req.user._id;

  const user = await User.findByIdAndDelete(userId);
  if (!user) throw new NotFoundError('User not found');

  res.json({ message: 'Account deleted successfully' });

};

export const updatePreferences = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user._id;
  const { dailyGoal, focusAreas } = req.body;

  const user = await User.findById(userId);
  if (!user) throw new NotFoundError('User not found');

  // Initialize if missing (for legacy docs)
  if (!user.learningPreferences) {
    user.learningPreferences = { dailyGoal: 30, focusAreas: [] };
  }

  if (dailyGoal !== undefined) user.learningPreferences.dailyGoal = dailyGoal;
  if (focusAreas !== undefined) user.learningPreferences.focusAreas = focusAreas;

  await user.save();

  res.json({ message: 'Preferences updated', preferences: user.learningPreferences });
};
export default {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAdmins,
  toggleUserStatus,
  updateProfile,
  changePassword,
  deleteAccount,
  updatePreferences,
};
