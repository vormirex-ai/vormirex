import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

/**
 * Define the schema for your environment variables using Zod.
 * This ensures that all required variables are present and correctly typed.
 */
const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().nonempty('DATABASE_URL is required.'),
  ACCESS_TOKEN_SECRET: z.string().nonempty('ACCESS_TOKEN_SECRET is required.'),
  REFRESH_TOKEN_SECRET: z
    .string()
    .nonempty('REFRESH_TOKEN_SECRET is required.'),
  EMAIL_HOST: z.string().nonempty('EMAIL_HOST is required.'),
  EMAIL_PORT: z.coerce.number().positive().default(587),
  EMAIL_USER: z.string().nonempty('EMAIL_USER is required.'),
  EMAIL_PASS: z.string().nonempty('EMAIL_PASS is required.'),
  GOOGLE_CLIENT_ID: z.string().nonempty('GOOGLE_CLIENT_ID is required.'),
  GOOGLE_CLIENT_SECRET: z
    .string()
    .nonempty('GOOGLE_CLIENT_SECRET is required.'),
  GOOGLE_CALLBACK_URL: z.string().nonempty('GOOGLE_CALLBACK_URL is required.'),
});

// Validate process.env against the schema
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  // Log the entire error object for a detailed and readable output.
  console.error('❌ Invalid environment variables:', parsedEnv.error);
  throw new Error('Invalid environment variables.');
}

// Export the validated and typed environment variables
export const env = parsedEnv.data;
