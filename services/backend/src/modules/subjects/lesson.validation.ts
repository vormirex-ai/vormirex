import { z } from 'zod';

export const lessonIdParamsSchema = z.object({
  params: z.object({
    id: z
      .string()
      .min(1, 'Lesson ID is required')
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format'),
  }),
});

export const lessonProgressSchema = z.object({
  params: z.object({
    id: z
      .string()
      .min(1, 'Lesson ID is required')
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format'),
  }),
  body: z.object({
    secondsWatched: z.number().min(0, 'secondsWatched cannot be negative'),
    durationWatchedIncrement: z
      .number()
      .min(0, 'durationWatchedIncrement cannot be negative'),
  }),
});
