import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const generateAccess = (payload: any) =>
  jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

export const generateRefresh = (payload: any) =>
  jwt.sign(payload, env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

export const verifyRefresh = (token: string) =>
  jwt.verify(token, env.REFRESH_TOKEN_SECRET);
