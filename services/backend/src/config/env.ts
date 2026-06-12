import dotenv from 'dotenv';
import { z } from 'zod';

import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '../../env/backend/.env') });

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
  CLOUDINARY_CLOUD_NAME: z.string().nonempty('CLOUDINARY_CLOUD_NAME is required.'),
  CLOUDINARY_API_KEY: z.string().nonempty('CLOUDINARY_API_KEY is required.'),
  CLOUDINARY_API_SECRET: z.string().nonempty('CLOUDINARY_API_SECRET is required.'),
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

/**
 * Returns the primary frontend URL. Supports comma-separated strings
 * (used for multiple CORS origins) and returns the first one.
 */
export const getFrontendUrl = (): string => {
  const url = process.env.FRONTEND_URL || 'http://localhost:5173';
  const urls = url.split(',').map((u) => u.trim());
  if (process.env.NODE_ENV === 'production') {
    const prodUrls = urls.filter(
      (u) =>
        !u.includes('localhost') &&
        !u.includes('127.0.0.1') &&
        !u.includes('frontend:')
    );
    if (prodUrls.length > 0) {
      return prodUrls[0];
    }
  }
  return urls[0];
};

/**
 * Returns the primary backend base URL. Checks BACKEND_URL first,
 * then tries to parse the domain from GOOGLE_CALLBACK_URL,
 * and falls back to localhost:4000.
 */
export const getBackendUrl = (): string => {
  if (process.env.BACKEND_URL) {
    return process.env.BACKEND_URL.trim();
  }
  if (process.env.GOOGLE_CALLBACK_URL) {
    try {
      const parsed = new URL(process.env.GOOGLE_CALLBACK_URL);
      return `${parsed.protocol}//${parsed.host}`;
    } catch {
      // fallback
    }
  }
  return 'http://localhost:4000';
};
