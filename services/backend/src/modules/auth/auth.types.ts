import { JwtPayload } from 'jsonwebtoken';
import { LoginBody, SignupBody } from './auth.validation.js';

export type SignupDTO = SignupBody;
export type LoginDTO = LoginBody;

/**
 * Defines the custom shape of our JWT payload, extending the default JwtPayload.
 */
export interface CustomJWTPayload extends JwtPayload {
  userId: string;
  role: string;
}
