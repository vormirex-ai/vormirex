import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errors.js';
import { logger } from '../config/logger.js';

/**
 * Centralized error handling middleware for Express.
 * This middleware should be the last one added to your app.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error using our new structured logger.
  // This will create a detailed, searchable log entry.
  logger.error(err.message, {
    stack: err.stack,
    status: err instanceof ApiError ? err.status : 500,
    path: req.path,
  });

  // Check if the error is one of our custom, operational errors.
  // These are "safe" to send to the client.
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ success: false, message: err.message });
  }

  // For all other unexpected errors, send a generic 500 response.
  // This prevents leaking sensitive implementation details to the client.
  return res.status(500).json({
    success: false,
    message: 'An unexpected internal server error occurred.',
  });
};
