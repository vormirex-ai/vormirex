import { z } from 'zod';
import { nameSchema, passwordSchema } from '../auth/auth.validation.js';

export const updateProfileSchema = z.object({
  body: z.object({
    name: nameSchema,
    timezone: z.string().optional(),
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
    dailyGoal: z.number().min(5).max(300).optional(),
    focusAreas: z.array(z.string()).optional(),
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
