import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../user/user.model.js';
import {
  generateAccess,
  generateRefresh,
  verifyRefresh,
} from '../../utils/jwt.js';
import { sendEmail } from '../../utils/mailer.js';
import {
  getResetPasswordEmailHTML,
  getVerificationEmailHTML,
} from '../../utils/emailTemplates.js';
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from '../../utils/errors.js';
import { updateUserStreak } from '../../utils/streak.js';
import type { SignupDTO, LoginDTO, CustomJWTPayload } from './auth.types.js';

export const signup = async (data: SignupDTO) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    // Prevent creating a new account if the email is already verified
    if (existingUser.isVerified) {
      throw new ConflictError('An account with this email already exists.');
    }

    // If the user exists but is not verified, update their record with a new
    // verification token and password instead of creating a new one.
    const hashed = await bcrypt.hash(data.password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    existingUser.password = hashed;
    existingUser.emailVerificationToken = verificationToken;
    await existingUser.save();

    // Resend the verification email to the updated user.
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;
    const emailHtml = getVerificationEmailHTML(
      existingUser.name,
      verificationUrl
    );
    await sendEmail({
      to: existingUser.email,
      subject: 'Verify Your Vormirex Account',
      text: `Please verify your account by clicking this link: ${verificationUrl}`,
      html: emailHtml,
    });
  } else {
    // If no user exists, create a new one.
    const hashed = await bcrypt.hash(data.password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await User.create({
      name: data.name,
      email: data.email,
      password: hashed,
      emailVerificationToken: verificationToken,
    });

    // Send verification email
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;
    const emailHtml = getVerificationEmailHTML(user.name, verificationUrl);
    await sendEmail({
      to: user.email,
      subject: 'Verify Your Vormirex Account',
      text: `Please verify your account by clicking this link: ${verificationUrl}`,
      html: emailHtml,
    });
  }

  return {
    message:
      'Signup successful. Please check your email to verify your account.',
  };
};

export const login = async (data: LoginDTO) => {
  const user = await User.findOne({ email: data.email }).select('+password');
  if (!user || !user.password) {
    throw new UnauthorizedError('Invalid email or password.');
  }

  // World-class check: ensure the user has verified their email
  if (!user.isVerified) {
    throw new UnauthorizedError(
      'Email not verified. Please check your inbox for the verification link.'
    );
  }

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) throw new UnauthorizedError('Invalid email or password.');

  const payload = { userId: user._id, role: user.role };

  const accessToken = generateAccess(payload);
  const refreshToken = generateRefresh(payload);

  await updateUserStreak(user);

  return { user, accessToken, refreshToken };
};

export const refreshToken = async (token: string) => {
  const decoded = verifyRefresh(token) as CustomJWTPayload;

  // Type guard to ensure the decoded payload is an object with the expected properties
  if (typeof decoded !== 'object' || !decoded.userId || !decoded.role) {
    throw new BadRequestError('Invalid refresh token payload');
  }

  const payload = { userId: decoded.userId, role: decoded.role };
  return generateAccess(payload);
};

export const verifyEmail = async (token: string) => {
  const user = await User.findOne({ emailVerificationToken: token });

  if (!user) {
    throw new BadRequestError('Invalid or expired verification token.');
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined; // Clear the token
  await user.save();

  return {
    message: 'Email verified successfully. You can now log in.',
  };
};

export const resendVerificationEmail = async (email: string) => {
  // 1. Find the user by their email address.
  const user = await User.findOne({ email });

  // 2. SECURITY: If no user is found, or if the user's email is already verified,
  // we return silently. This prevents email enumeration attacks and avoids
  // sending unnecessary emails or confusing already-verified users.
  if (!user || user.isVerified) {
    return;
  }

  // 3. Generate a new, secure verification token.
  const verificationToken = crypto.randomBytes(32).toString('hex');

  // 4. Update the user's record with the new token.
  user.emailVerificationToken = verificationToken;
  await user.save();

  // 5. Construct the verification URL and send the email.
  // It's good practice to use an environment variable for the base URL.
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  const verificationUrl = `${frontendUrl}/verify-email?token=${verificationToken}`;
  const emailHtml = getVerificationEmailHTML(user.name, verificationUrl);

  await sendEmail({
    to: user.email,
    subject: 'Verify Your Vormirex Account (New Link)',
    text: `Please verify your account by clicking this link: ${verificationUrl}`,
    html: emailHtml,
  });

  // Note: No return value is needed. The controller handles the response,
  // always sending a generic success message.
};

export const handleForgotPassword = async (email: string) => {
  const user = await User.findOne({ email });

  // If no user is found or they haven't verified their email, we return silently.
  // The controller sends a generic response, preventing attackers from discovering
  // which emails are registered or active.
  if (!user || !user.isVerified) {
    return;
  }

  // 1. Generate a secure, unhashed token for the email link.
  const resetToken = crypto.randomBytes(32).toString('hex');

  // 2. Hash the token before storing it in the database for security.
  user.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // 3. Set an expiration time for the token (e.g., 10 minutes).
  user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  await user.save();

  // 4. Send the email with the unhashed token.
  // Use an environment variable for the frontend URL for better flexibility.
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;
  const emailHtml = getResetPasswordEmailHTML(user.name, resetUrl);

  await sendEmail({
    to: user.email,
    subject: 'Your Vormirex Password Reset Request',
    text: `You requested a password reset. Please use the following link to reset your password: ${resetUrl}`,
    html: emailHtml,
  });

  // Note: No return value is needed. The controller handles the response.
};

export const resetPassword = async (token: string, newPassword: string) => {
  // 1. Hash the incoming token to match the one stored in the database.
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  // 2. Find the user by the hashed token and ensure the token has not expired.
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() }, // Check if expiry is in the future
  });

  // If no user is found or the token is expired, throw a specific error.
  if (!user) {
    throw new BadRequestError('Invalid or expired password reset token.');
  }

  // 3. Hash the new password.
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // 4. Update the user's password with the new hash.
  user.password = hashedPassword;

  // 5. CRITICAL: Invalidate the reset token by clearing the fields.
  // This prevents the same token from being used again.
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // The controller will send a success response.
};
export const getUserProfile = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new BadRequestError('User not found');
  }
  return { id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified };
};
