/**
 * Generates a professional HTML email template for account verification.
 * @param name - The user's name.
 * @param verificationUrl - The URL the user will click to verify their account.
 * @returns A string containing the HTML for the email.
 */
export const getVerificationEmailHTML = (
  name: string,
  verificationUrl: string
): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
      <h2 style="color: #4F46E5;">Welcome to Vormirex!</h2>
      <p>Hi ${name},</p>
      <p>Thank you for signing up. Please verify your email address by clicking the button below. This link will expire in 24 hours.</p>
      <p style="text-align: center;">
        <a href="${verificationUrl}" style="display: inline-block; background-color: #4F46E5; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Verify Email Address</a>
      </p>
      <p>If you did not sign up for a Vormirex account, you can safely ignore this email.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 0.9em; color: #777;">
        Vormirex Team<br>
        <a href="https://www.vormirex.com" style="color: #4F46E5;">www.vormirex.com</a>
      </p>
    </div>
  `;
};

/**
 * Generates a professional HTML email template for password resets.
 * @param name - The user's name.
 * @param resetUrl - The URL the user will click to reset their password.
 * @returns A string containing the HTML for the email.
 */
export const getResetPasswordEmailHTML = (
  name: string,
  resetUrl: string
): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
      <h2 style="color: #4F46E5;">Password Reset Request</h2>
      <p>Hi ${name},</p>
      <p>We received a request to reset the password for your Vormirex account. Please click the button below to choose a new password. This link will expire in 10 minutes.</p>
      <p style="text-align: center;">
        <a href="${resetUrl}" style="display: inline-block; background-color: #4F46E5; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 20px;">Reset Your Password</a>
      </p>
      <p>If you did not request a password reset, please ignore this email. Your password will not be changed.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 0.9em; color: #777;">
        Vormirex Team<br>
        <a href="https://www.vormirex.com" style="color: #4F46E5;">www.vormirex.com</a>
      </p>
    </div>
  `;
};

/**
 * Generates a professional HTML email template for Admin 2FA.
 * @param name - The user's name.
 * @param otp - The 6-digit verification code.
 * @returns A string containing the HTML for the email.
 */
export const getAdminVerificationEmailHTML = (
  name: string,
  otp: string
): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
      <h2 style="color: #4F46E5;">Admin Verification Required</h2>
      <p>Hi ${name},</p>
      <p>We detected a login attempt to your Vormirex Admin account. To complete the login process, please use the verification code below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4F46E5; background: #f0f0ff; padding: 10px 20px; border-radius: 8px; border: 1px dashed #4F46E5;">${otp}</span>
      </div>
      <p>This code will expire in 10 minutes.</p>
      <p>If you did not attempt to log in, please change your password immediately and contact support.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 0.9em; color: #777;">
        Vormirex Security Team<br>
        <a href="https://www.vormirex.com" style="color: #4F46E5;">www.vormirex.com</a>
      </p>
    </div>
  `;
};

export const getGuestVerificationEmailHTML = (name: string, otp: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
    <div style="padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
      <h2 style="color: #4b6cb7;">Guest Access Code</h2>
      <p style="font-size: 16px;">Hi ${name},</p>
      <p style="font-size: 16px;">We received a request for temporary guest access to Vormirex. Please use the verification code below:</p>
      
      <div style="margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4b6cb7; padding: 10px 20px; border: 2px dashed #4b6cb7; border-radius: 10px;">${otp}</span>
      </div>
      
      <p style="font-size: 14px;">This code will expire in 10 minutes.</p>
      <p style="font-size: 14px;">If you did not request this access, you can safely ignore this email.</p>
      
      <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;" />
      <p style="font-size: 12px; color: #888;">
        Vormirex Security Team<br>
        <a href="https://vormirex.com" style="color: #4b6cb7; text-decoration: none;">www.vormirex.com</a>
      </p>
    </div>
  </div>
`;
