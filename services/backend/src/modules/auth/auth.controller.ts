import type { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service.js';
import { BadRequestError, UnauthorizedError } from '../../utils/errors.js';
import { getFrontendUrl } from '../../config/env.js';
import {
  ForgotPasswordBody,
  LoginBody,
  ResetPasswordBody,
  SignupBody,
} from './auth.validation.js';

const isProduction = process.env.NODE_ENV === 'production';
const getCookieOptions = (maxAge?: number) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: (isProduction ? 'none' : 'lax') as 'none' | 'lax' | 'strict',
  ...(maxAge !== undefined ? { maxAge } : {}),
});


export const signup = async (
  req: Request<object, object, SignupBody>,
  res: Response,
  next: NextFunction
) => {
  /* #swagger.requestBody = {
       required: true,
       content: {
         "application/json": {
           schema: {
             type: "object",
             properties: {
               name: { type: "string", example: "John Doe" },
               email: { type: "string", example: "john@example.com" },
               password: { type: "string", example: "password123" }
             },
             required: ["name", "email", "password"]
           }
         }
       }
     } */
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
  /* #swagger.requestBody = {
       required: true,
       content: {
         "application/json": {
           schema: {
             type: "object",
             properties: {
               email: { type: "string", example: "ashishsingh4895@gmail.com" },
               password: { type: "string", example: "123@qwe" }
             },
             required: ["email", "password"]
           }
         }
       }
     } */
  try {
    const result = await authService.login(req.body);
    if (result.requireTwoFactor) {
      return res.status(200).json({
        success: true,
        requireTwoFactor: true,
        message: 'Verification code sent to your email.',
        email: result.email,
      });
    }

    // Standard Login Success
    res.cookie('refresh_token', result.refreshToken, getCookieOptions(7 * 24 * 60 * 60 * 1000));

    const userResponse = {
      id: result.user!._id,
      name: result.user!.name,
      email: result.user!.email,
      role: result.user!.role,
      phoneNumber: result.user!.phoneNumber,
      profilePhoto: result.user!.profilePhoto,
    };

    return res.json({ success: true, accessToken: result.accessToken, refreshToken: result.refreshToken, user: userResponse });
  } catch (error) {
    next(error);
  }
};

export const verifyTwoFactor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      throw new BadRequestError('Email and code are required');
    }

    const { accessToken, refreshToken, user } = await authService.verifyTwoFactorCode(email, code);

    res.cookie('refresh_token', refreshToken, getCookieOptions(7 * 24 * 60 * 60 * 1000));

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profilePhoto: user.profilePhoto,
    };

    return res.json({ success: true, accessToken, refreshToken, user: userResponse });
  } catch (error) {
    next(error);
  }
};


export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const frontendUrl = getFrontendUrl();
  try {
    const { token } = req.query;
    if (typeof token !== 'string') {
      throw new BadRequestError('A valid verification token must be provided.');
    }
    await authService.verifyEmail(token);
    return res.redirect(`${frontendUrl}/login?verified=true`);
  } catch (error) {
    const errorMsg = (error as any).message || 'Verification failed';
    return res.redirect(`${frontendUrl}/login?verified=false&error=${encodeURIComponent(errorMsg)}`);
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

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refresh_token || req.body.refreshToken || req.headers['x-refresh-token'];
    if (!token || typeof token !== 'string') {
      throw new UnauthorizedError('No refresh token provided');
    }
    const newAccess = await authService.refreshToken(token);
    return res.json({ success: true, accessToken: newAccess });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('refresh_token', getCookieOptions());
    return res.json({ success: true, message: 'Logged out' });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // verified by requireAuth middleware
    const userId = (req.user as any).userId; 
    const userFn = await authService.getUserProfile(userId);
    return res.json({ success: true, user: userFn });
  } catch (error) {
    next(error);
  }
};

export const requestGuestOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) throw new BadRequestError('Email is required');
    await authService.sendGuestOTP(email);
    return res.status(200).json({ success: true, message: 'Verification code sent to your email.' });
  } catch (error) {
    next(error);
  }
};

export const verifyGuestOTPAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) throw new BadRequestError('Email and code are required');
    
    const result = await authService.verifyGuestOTP(email, code);

    // Give them the refresh cookie
    res.cookie('refresh_token', result.refreshToken, getCookieOptions(7 * 24 * 60 * 60 * 1000));

    const userResponse = {
      id: result.user._id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role,
    };

    return res.json({ success: true, accessToken: result.accessToken, refreshToken: result.refreshToken, user: userResponse });
  } catch (error) {
    next(error);
  }
};
