import { z } from 'zod';

// Helper to convert empty form strings to undefined
const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((val) => (val === '' ? undefined : val), schema);

export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(200),
    content: z.string().optional(),
    subjectId: emptyToUndefined(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Subject ID').optional()),
    subjectName: z.string().optional(),
    fileUrl: z.string().url('Invalid file URL').optional(),
  }),
});

export const updateNoteSchema = z.object({
  body: z.object({
    title: emptyToUndefined(z.string().min(1, 'Title cannot be empty').max(200).optional()),
    content: z.string().optional(),
    subjectId: emptyToUndefined(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Subject ID').optional()),
    subjectName: z.string().optional(),
    isBookmarked: z.preprocess((val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return val;
    }, z.boolean()).optional(),
    fileUrl: z.string().url('Invalid file URL').optional(),
  }),
});
