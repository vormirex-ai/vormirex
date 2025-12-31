import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/errors.js';

/**
 * A higher-order function that creates a middleware for checking user roles.
 * @param allowedRoles An array of roles that are permitted to access the route.
 * @returns An Express middleware function.
 */
export const checkRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // The `requireAuth` middleware should have already run and attached the user to the request.
    const user = req.user;

    if (!user || !user.role || !allowedRoles.includes(user.role)) {
      // If the user doesn't exist, has no role, or their role is not in the allowed list, deny access.
      throw new ForbiddenError();
    }

    // If the user's role is permitted, allow the request to proceed.
    next();
  };
};
