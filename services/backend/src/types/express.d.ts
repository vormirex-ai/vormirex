import { CustomJWTPayload } from '../modules/auth/auth.types.ts';

// This file uses declaration merging to add a custom property to the Express Request interface.

declare global {
  namespace Express {
    export interface Request {
      user?: CustomJWTPayload;
    }
  }
}
