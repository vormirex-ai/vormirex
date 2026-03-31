import { z } from 'zod';
import { nameSchema, passwordSchema } from '../auth/auth.validation.js';

export const updateProfileSchema = z.object({
  body: z.object({
    name: nameSchema.optional(),
    timezone: z.string().optional(),
    phoneNumber: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits').optional(),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().nonempty('Current password is required'),
    newPassword: passwordSchema,
  }).refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password cannot be the same as the old password",
    path: ["newPassword"],
  }),
});

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>['body'];
export type ChangePasswordBody = z.infer<typeof changePasswordSchema>['body'];

export const updatePreferencesSchema = z.object({
  body: z.object({
    dailyGoal: z.number().min(0).max(300).optional(),
    focusAreas: z.array(z.string()).optional(),
    primaryFocus: z.enum(['Master a skill', 'Ace an exam', 'Expand knowledge']).optional(),
    curiosity: z.array(z.string()).optional(),
    learningPace: z.enum(['Fast track', 'Balanced', 'Deep focus']).optional(),
    learningFormat: z.array(z.enum(['Reading', 'Short videos', 'Practice and exercise', 'AI Experience'])).optional(),
    challengeLevel: z.enum(['Beginner friendly', 'Progressive growth', 'Advanced challenging']).optional(),
    learningGoals: z.array(z.enum(['Job ready', 'Real Project', 'Ace Exam', 'Daily Habit'])).optional(),
    currentSkillLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
    timeline: z.string().optional(),
  }),
});

export type UpdatePreferencesBody = z.infer<typeof updatePreferencesSchema>['body'];

export const updateNotificationPreferencesSchema = z.object({
  body: z.object({
    streakReminders: z.boolean().optional(),
    newCourseAlerts: z.boolean().optional(),
    securityAlerts: z.boolean().optional(),
  }),
});

export type UpdateNotificationPreferencesBody = z.infer<typeof updateNotificationPreferencesSchema>['body'];

export const updatePrivacySettingsSchema = z.object({
  body: z.object({
    isProfilePublic: z.boolean().optional(),
    showProgress: z.boolean().optional(),
    showCourses: z.boolean().optional(),
  }),
});

export type UpdatePrivacySettingsBody = z.infer<typeof updatePrivacySettingsSchema>['body'];
