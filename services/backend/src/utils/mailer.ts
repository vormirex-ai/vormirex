import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_PORT === 465, // Use true for port 465, false for other ports
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

interface EmailOptions {
  from?: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

/**
 * Sends an email using the configured transporter.
 * @param options - Email options including recipient, subject, and body.
 */
export const sendEmail = async (options: EmailOptions) => {
  try {
    // Set a default 'from' address if one isn't provided.
    const mailOptions = {
      from: `"Vormirex" <${env.EMAIL_USER}>`, // Use your Gmail address as the sender
      ...options,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent: ${info.messageId}`);
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Could not send email.');
  }
};
