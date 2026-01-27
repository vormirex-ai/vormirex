import { z } from 'zod';

/**
 * A reusable, case-insensitive email schema that performs trimming and lowercasing.
 * This ensures that email addresses are standardized before any other processing.
 * strict regex enforces TLD and prevents leading special characters.
 */
const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: 'Email is required' })
  .regex(emailRegex, { message: 'Invalid email address (cannot start with special characters)' })
  .transform((val) => val.toLowerCase());

const passwordSchema = z
  .string()
  .nonempty('Password is required')
  .min(6, { message: 'Password must be at least 6 characters long' });

/**
 * A reusable name schema that trims, sanitizes against XSS, and validates length/characters.
 */
const nameSchema = z
  .string()
  .trim()
  .transform((val) => val.replace(/<[^>]*>?/gm, '')) // Strip HTML tags for XSS prevention
  .pipe(
    z
      .string()
      .nonempty('Name is required')
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must be 50 characters or less' })
      .regex(/^[a-zA-Z0-9\s.'-]+$/, { message: 'Name contains invalid characters' })
  );

export const signupValidationSchema = z.object({
  body: z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: emailSchema,
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().nonempty('Token is required'),
    password: passwordSchema,
  }),
});

export type SignupBody = z.infer<typeof signupValidationSchema>['body'];
export type LoginBody = z.infer<typeof loginValidationSchema>['body'];
export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>['body'];
export type ResetPasswordBody = z.infer<typeof resetPasswordSchema>['body'];
