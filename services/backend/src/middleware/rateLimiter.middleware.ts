import rateLimit from 'express-rate-limit';

/**
 * A rate limiter middleware for authentication routes.
 * This helps prevent brute-force attacks on sensitive endpoints.
 *
 * It allows 20 requests per 15 minutes from a single IP address.
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message:
      'Too many requests from this IP, please try again after 15 minutes.',
  },
});
