import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  beforeAll,
} from '@jest/globals';
import request from 'supertest';
import express, { Express } from 'express';
import { SignupBody } from './auth.validation.js';

// --------------------------------------------------
// FIX 1: Mock the TypeScript file, not .js
// --------------------------------------------------
jest.mock('./auth.service.ts', () => ({
  __esModule: true,
  signup: jest.fn(),
  login: jest.fn(),
  refreshToken: jest.fn(),
  verifyEmail: jest.fn(),
  handleForgotPassword: jest.fn(),
  resetPassword: jest.fn(),
}));

describe('Auth Routes', () => {
  let app: Express;

  // --------------------------------------------------
  // FIX 2: Correct type for mocked module
  // --------------------------------------------------
  let mockedAuthService: jest.Mocked<typeof import('./auth.service.js')>;

  beforeAll(async () => {
    // load mocked service
    mockedAuthService = jest.requireMock('./auth.service.ts') as jest.Mocked<
      typeof import('./auth.service.js')
    >;

    // FIXED: import the TS router file
    const authRouter = (await import('./auth.routes.js')).default;

    app = express();
    app.use(express.json());
    app.use('/api/auth', authRouter);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    return;
  });

  describe('POST /api/auth/signup', () => {
    it('should return 201 and a success message for a valid signup', async () => {
      const signupData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      const serviceResponse = {
        message:
          'Signup successful. Please check your email to verify your account.',
      };

      mockedAuthService.signup.mockResolvedValue(serviceResponse);

      const response = await request(app)
        .post('/api/auth/signup')
        .send(signupData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ success: true, data: serviceResponse });
      expect(mockedAuthService.signup).toHaveBeenCalledWith(signupData);
    });

    it('should return 409 if the email already exists', async () => {
      mockedAuthService.signup.mockRejectedValue(
        new Error('Email already exists')
      );

      const response = await request(app).post('/api/auth/signup').send({
        name: 'Test User',
        email: 'existing@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(409);
      expect(response.body).toEqual({
        success: false,
        message: 'Email already exists',
      });
    });

    it('should return 400 for invalid input data (short password)', async () => {
      const response = await request(app).post('/api/auth/signup').send({
        name: 'Test',
        email: 'test@example.com',
        password: '123',
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);

      const issue = response.body.errors?.[0]?.message;
      expect(issue).toBe('Password must be at least 6 characters long');
    });

    it('should return 500 for unexpected server errors', async () => {
      mockedAuthService.signup.mockRejectedValue(
        new Error('Database connection failed')
      );

      const response = await request(app).post('/api/auth/signup').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Internal Server Error');
    });
  });
});
