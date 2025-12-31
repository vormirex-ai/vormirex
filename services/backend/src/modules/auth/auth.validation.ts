import { z } from 'zod';

/**
 * A reusable, case-insensitive email schema that performs trimming and lowercasing.
 * This ensures that email addresses are standardized before any other processing.
 */
const emailSchema = z
  .string()
  .email({ message: 'Invalid email address' })
  .trim()
  .min(1, { message: 'Email is required' }) // Use .min(1) for non-empty check
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
  );

export const signupValidationSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginValidationSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  // The request body should contain an email.
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  token: z.string().nonempty('Token is required'),
  password: passwordSchema,
});

export type SignupBody = z.infer<typeof signupValidationSchema>;
export type LoginBody = z.infer<typeof loginValidationSchema>;
export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordBody = z.infer<typeof resetPasswordSchema>;
