import { describe, it, expect } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { generateAccess, generateRefresh, verifyRefresh } from '../../utils/jwt.js';
import { env } from '../../config/env.js';
import { refreshToken } from './auth.service.js';
import { BadRequestError } from '../../utils/errors.js';

describe('Token Integration & JWT Lifecycle Tests', () => {
  const testPayload = { userId: '507f1f77bcf86cd799439011', role: 'user' };

  describe('AccessToken generation and verification', () => {
    it('should generate a valid access token signed with ACCESS_TOKEN_SECRET', () => {
      const token = generateAccess(testPayload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');

      // Verify the token manually with the secret
      const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as any;
      expect(decoded.userId).toBe(testPayload.userId);
      expect(decoded.role).toBe(testPayload.role);
      
      // Expire time should be in ~15 mins (900 seconds)
      const diff = decoded.exp - decoded.iat;
      expect(diff).toBe(15 * 60);
    });
  });

  describe('RefreshToken generation and verification', () => {
    it('should generate a valid refresh token signed with REFRESH_TOKEN_SECRET', () => {
      const token = generateRefresh(testPayload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');

      // Verify with verifyRefresh util function
      const decoded = verifyRefresh(token) as any;
      expect(decoded.userId).toBe(testPayload.userId);
      expect(decoded.role).toBe(testPayload.role);

      // Expire time should be in ~7 days (604800 seconds)
      const diff = decoded.exp - decoded.iat;
      expect(diff).toBe(7 * 24 * 60 * 60);
    });

    it('should throw error when verifying with wrong secret (i.e. if ACCESS_TOKEN_SECRET is used)', () => {
      if (env.ACCESS_TOKEN_SECRET !== env.REFRESH_TOKEN_SECRET) {
        const token = generateRefresh(testPayload);
        expect(() => {
          jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        }).toThrow();
      }
    });
  });

  describe('RefreshToken Service Endpoint', () => {
    it('should successfully generate a new access token from a valid refresh token', async () => {
      const token = generateRefresh(testPayload);
      const newAccessToken = await refreshToken(token);
      expect(newAccessToken).toBeDefined();
      expect(typeof newAccessToken).toBe('string');

      const decoded = jwt.verify(newAccessToken, env.ACCESS_TOKEN_SECRET) as any;
      expect(decoded.userId).toBe(testPayload.userId);
      expect(decoded.role).toBe(testPayload.role);
    });

    it('should throw BadRequestError for invalid token payload (e.g. missing userId or role)', async () => {
      // Sign a token without role
      const invalidPayload = { userId: '507f1f77bcf86cd799439011' };
      const badToken = jwt.sign(invalidPayload, env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

      await expect(refreshToken(badToken)).rejects.toThrow(BadRequestError);
    });

    it('should throw verification error for expired or altered refresh token', async () => {
      // 1. Expired token
      const expiredToken = jwt.sign(testPayload, env.REFRESH_TOKEN_SECRET, { expiresIn: '0s' });
      await expect(refreshToken(expiredToken)).rejects.toThrow();

      // 2. Altered token
      const token = generateRefresh(testPayload);
      const alteredToken = token + 'manipulated';
      await expect(refreshToken(alteredToken)).rejects.toThrow();
    });
  });
});
