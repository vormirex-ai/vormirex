import { Redis } from 'ioredis';
import { env } from './env.js';

// Initialize Redis client using the validated REDIS_URL
export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null, // Essential to prevent crashes if Redis is temporarily offline
});

redis.on('connect', () => {
  console.log('✅ Connected to Redis successfully');
});

redis.on('error', (err) => {
  console.error('❌ Redis Connection Error:', err);
});
