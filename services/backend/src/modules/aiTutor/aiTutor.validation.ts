import { z } from 'zod';

export const lessonIdParamsSchema = z.object({
  params: z.object({
    lessonId: z
      .string()
      .min(1, 'Lesson ID is required')
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format'),
  }),
});

export const aiTutorMessageSchema = z.object({
  params: z.object({
    lessonId: z
      .string()
      .min(1, 'Lesson ID is required')
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format'),
  }),
  body: z.object({
    message: z.string().min(1, 'Message content cannot be empty'),
    actionType: z.enum(['explain', 'example', 'exam', 'summarize']).optional(),
  }),
});
