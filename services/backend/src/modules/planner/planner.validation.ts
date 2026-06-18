import { z } from 'zod';

export const createPlannerTaskSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    date: z.string().nonempty('Date is required'),
    durationMinutes: z.number().int().positive().optional(),
    subjectId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Subject ID').optional(),
    taskType: z.enum(['lesson', 'quiz', 'practice', 'reading', 'notes', 'revision', 'coding', 'lab', 'exam']).optional(),
    description: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    xpAwarded: z.number().int().positive().optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(['active', 'next', 'upcoming', 'completed', 'skipped']).optional(),
  }),
});

export const updatePlannerTaskSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    date: z.string().optional(),
    durationMinutes: z.number().int().positive().optional(),
    subjectId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Subject ID').optional().nullable(),
    taskType: z.enum(['lesson', 'quiz', 'practice', 'reading', 'notes', 'revision', 'coding', 'lab', 'exam']).optional(),
    description: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    xpAwarded: z.number().int().positive().optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(['active', 'next', 'upcoming', 'completed', 'skipped']).optional(),
  }),
});
