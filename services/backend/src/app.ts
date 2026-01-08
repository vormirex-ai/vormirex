import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestLogger, responseLogger } from './middleware/requestResponse.middleware.js';
import authRouter from './modules/auth/auth.routes.js';
import courseRouter from './modules/courses/course.routes.js';
import userRouter from './modules/user/user.routes.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';
import './config/passport.js';

// Initialize the Express application
const app: Application = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'http://localhost:3000',
    ],
    credentials: true,
  })
);
// Secure the app by setting various HTTP headers
app.use((helmet as unknown as () => any)());
app.use(requestLogger);
app.use(responseLogger);
// Enable the Express app to parse JSON-formatted request bodies
app.use(express.json({ limit: '10kb' })); // Limit payload size for security

// --- Routes ---
app.get('/', (req: Request, res: Response) => {
  res.send('Vormirex API is running...');
});

// Mount the application routes AFTER core middleware
app.use('/api/auth', authRouter);
app.use('/api/courses', courseRouter);
app.use('/api/users', userRouter);

// --- Centralized Error Handler ---
// This must be the LAST middleware added to the app.
app.use(errorHandler);

export default app;
