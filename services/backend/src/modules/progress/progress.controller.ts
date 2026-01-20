import { Request, Response } from 'express';
import Progress from './progress.model.js';
import { BadRequestError, NotFoundError } from '../../utils/errors.js';
import { CustomJWTPayload } from '../auth/auth.types.js';

// Enroll User (Self or Admin)
export const enrollUser = async (req: Request, res: Response) => {
  const { userId, courseId } = req.body;
  
  // @ts-ignore
  const requester = req.user as CustomJWTPayload;

  // Usage: 
  // 1. User enrolls themselves: body { courseId } (userId inferred from token)
  // 2. Admin enrolls user: body { userId, courseId }

  let targetUserId = userId;
  if (!targetUserId) {
      targetUserId = requester.userId;
  }

  // Safety: If enrolling someone else, must be admin/super-admin
  if (targetUserId !== requester.userId) {
      // Logic handled by RBAC usually, but here we check if they are trying to act on another user
      // If req.user.role is 'user', they shouldn't pass a different userId.
      // We can enforce this:
      if (requester.role === 'user') {
          throw new BadRequestError('You can only enroll yourself.');
      }
  }

  const existing = await Progress.findOne({ userId: targetUserId, courseId });
  if (existing) {
      return res.status(400).json({ message: 'User already enrolled in this course.' });
  }

  const progress = await Progress.create({
      userId: targetUserId,
      courseId,
      status: 'enrolled'
  });

  res.status(201).json({ message: 'Enrolled successfully', progress });
};

// Update Progress (Admin: Grade/Lessons, Super Admin: Everything)
export const updateProgress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { grade, completedLessons, status } = req.body;
  // @ts-ignore
  const userRole = req.user?.role;

  const progress = await Progress.findById(id);
  if (!progress) {
    throw new NotFoundError('Progress not found');
  }

  // Admin Restrictions
  if (userRole === 'admin') {
      // Admins cannot change status to 'dropped' (assumption based on usage, or maybe they can? 
      // User said "limited edit rights ... shouldn't be able to wipe ... or delete")
      // Let's say Admins can GRADE and update LESSONS.
      // But maybe we restrict altering 'enrolled/completed' status manually? 
      // For now, let's allow them to update grade and lessons freely.
      
      if (status && status === 'dropped') {
           throw new BadRequestError('Admins cannot drop students. Contact Super Admin.');
      }
  }

  if (grade !== undefined) progress.grade = grade;
  if (completedLessons !== undefined) progress.completedLessons = completedLessons;
  if (status !== undefined) progress.status = status;

  if (status === 'completed' && !progress.completedAt) {
      progress.completedAt = new Date();
  }

  await progress.save();
  res.status(200).json({ message: 'Progress updated', progress });
};

// Delete Progress (Super Admin Only)
export const deleteProgress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const progress = await Progress.findByIdAndDelete(id);
  if (!progress) {
      throw new NotFoundError('Progress record not found');
  }
  res.status(200).json({ message: 'Progress history deleted successfully' });
};

export default {
    enrollUser,
    updateProgress,
    deleteProgress
};
