import { z } from 'zod';

export const createCourseSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters').max(100),
    subtitle: z.string().max(200).optional(),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters'),
    price: z.number().min(0, 'Price cannot be negative'),
    thumbnail: z.string().url('Thumbnail must be a valid URL'),
    instructorId: z.string().min(1, 'Instructor ID is required'),
    tags: z.array(z.string()).optional(),
    level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
    
    // Validate the rich curriculum structure
    levels: z.array(
      z.object({
        level: z.enum(['Foundation', 'Advanced', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED']), // Frontend uses Foundation/Advanced, Backend uses Enum. Allowing both mixed for flexibility or map them.
        duration: z.string().optional(),
        highlights: z.array(z.string()).optional(),
        modules: z.array(
          z.object({
            title: z.string(),
            items: z.array(z.string())
          })
        )
      })
    ).optional(),

    status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
  }),
});

export const updateCourseSchema = z.object({
  body: createCourseSchema.shape.body.partial(),
  params: z.object({
    id: z.string().min(1, 'Course ID is required'),
  }),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>['body'];

export const courseIdParamsSchema = z.object({
  params: z.object({ id: z.string().min(1, 'Course ID is required') }),
});
