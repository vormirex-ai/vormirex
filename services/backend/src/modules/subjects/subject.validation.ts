import { z } from 'zod';

export const createSubjectSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(100),
    subtitle: z.string().max(200).optional(),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters'),
    icon: z.string().min(1, 'Icon identifier is required'),
    price: z.number().min(0).default(0),
    isPro: z.boolean().default(false),
    hasCertificate: z.boolean().default(false),
    status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
    tags: z.array(z.string()).optional(),
  }),
});

export const updateSubjectSchema = z.object({
  body: createSubjectSchema.shape.body.partial(),
  params: z.object({
    id: z.string().min(1, 'Subject ID is required'),
  }),
});

export const subjectIdParamsSchema = z.object({
  params: z.object({
    id: z
      .string()
      .min(1, 'Subject ID is required')
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format'),
  }),
});
