import { Router } from 'express';
import passport from 'passport';
import * as authController from './auth.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { authRateLimiter } from '../../middleware/rateLimiter.middleware.js';
import { checkRole } from '../../middleware/rbac.middleware.js';
import {
  loginValidationSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  signupValidationSchema,
} from './auth.validation.js';
import { validate } from '../../middleware/validate.middleware.js';
import { streakMiddleware } from '../../middleware/streak.middleware.js';
import { generateAccess, generateRefresh } from '../../utils/jwt.js';
import { env } from '../../config/env.js';

const authRouter = Router();

// @route   POST /api/auth/signup
authRouter.post(
  '/signup',
  authRateLimiter,
  validate(signupValidationSchema),
  authController.signup
);

// @route   POST /api/auth/login
authRouter.post(
  '/login',
  authRateLimiter,
  validate(loginValidationSchema),
  authController.login
);

// @route   GET /api/auth/verify-email
// No rate limit needed here as it requires a unique, single-use token.
authRouter.get('/verify-email', authController.verifyEmail);

// @route   POST /api/auth/forgot-password
authRouter.post(
  '/forgot-password',
  authRateLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword
);

// @route   POST /api/auth/reset-password
authRouter.post(
  '/reset-password',
  authRateLimiter,
  validate(resetPasswordSchema),
  authController.resetPassword
);

// @route   POST /api/auth/resend-verification
authRouter.post(
  '/resend-verification',
  authRateLimiter,
  validate(forgotPasswordSchema),
  authController.resendVerificationEmail
);

// @route   POST /api/auth/refresh
// This route is protected by the httpOnly refresh token cookie, so a general rate limit is less critical.
authRouter.post('/refresh', authController.refreshToken);

// @route   POST /api/auth/logout
// This route is protected by authentication middleware.
authRouter.post('/logout', requireAuth, streakMiddleware, authController.logout);

// --- Example Admin-Only Route ---
// @route   GET /api/auth/admin-only
// This route is protected by both authentication and role-based access control.
authRouter.get(
  '/admin-only',
  requireAuth, // 1. First, ensure the user is logged in.
  streakMiddleware,
  checkRole(['admin']), // 2. Then, check if the user has the 'admin' role.
  (req, res) => {
    res.json({ success: true, message: 'Welcome, Admin!' });
  }
);

// --- Google OAuth Routes ---

// @route   GET /api/auth/google
// Initiates the Google OAuth flow.
authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @route   GET /api/auth/google/callback
// Handles the callback from Google.
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  (req, res) => {
    // The user is already authenticated by Passport and attached to req.user
    const user = req.user as any;

    const payload = { userId: user._id, role: user.role };
    const accessToken = generateAccess(payload);
    const refreshToken = generateRefresh(payload);

    // Redirect to the frontend with tokens.
    // In a production app, you might set these as HTTP-only cookies here,
    // or pass them in the URL fragment/query params for the frontend to capture.
    // Make sure FRONTEND_URL is defined in your .env
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(
      `${frontendUrl}/oauth-success?accessToken=${accessToken}&refreshToken=${refreshToken}`
    );
  }
);

// @route   GET /api/auth/me
// Get current user profile
authRouter.get('/me', requireAuth, authController.getProfile);

export default authRouter;
