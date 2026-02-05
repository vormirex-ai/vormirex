import type { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service.js';
import { BadRequestError, UnauthorizedError } from '../../utils/errors.js';
import {
  ForgotPasswordBody,
  LoginBody,
  ResetPasswordBody,
  SignupBody,
} from './auth.validation.js';

export const signup = async (
  req: Request<object, object, SignupBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await authService.signup(req.body);
    return res.status(201).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<object, object, LoginBody>,
  res: Response,
  next: NextFunction
) => {
  console.log('[DEBUG] Login request received:', req.body.email);
  try {
    console.log('[DEBUG] Calling authService.login...');
    const { accessToken, refreshToken, user } = await authService.login(req.body);
    console.log('[DEBUG] authService.login successful');

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.json({ success: true, accessToken, user: userResponse });
  } catch (error) {
    console.error('[DEBUG] Login error caught in controller:', error);
    next(error);
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.query;
    if (typeof token !== 'string') {
      throw new BadRequestError('A valid verification token must be provided.');
    }
    const result = await authService.verifyEmail(token);
    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    next(error);
  }
};

export const resendVerificationEmail = async (
  req: Request<object, object, ForgotPasswordBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.resendVerificationEmail(req.body.email);
    return res.status(200).json({
      success: true,
      message:
        'If an account with that email exists and is not yet verified, a new verification link has been sent.',
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request<object, object, ForgotPasswordBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.handleForgotPassword(req.body.email);
    return res.status(200).json({
      success: true,
      message:
        'If an account with that email exists, a password reset link has been sent.',
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request<object, object, ResetPasswordBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, password } = req.body;
    await authService.resetPassword(token, password);
    return res
      .status(200)
      .json({ success: true, message: 'Password has been reset successfully.' });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refresh_token;
  if (!token) {
    // This is a synchronous check, so we can throw our custom error directly
    // and express-async-errors will handle it.
    throw new UnauthorizedError('No refresh token provided');
  }
  const newAccess = await authService.refreshToken(token);
  return res.json({ success: true, accessToken: newAccess });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('refresh_token');
  return res.json({ success: true, message: 'Logged out' });
};

export const getProfile = async (req: Request, res: Response) => {
  // verified by requireAuth middleware
  const userId = (req.user as any).userId; 
  const userFn = await authService.getUserProfile(userId);
  return res.json({ success: true, user: userFn });
};
