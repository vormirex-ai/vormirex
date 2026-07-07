import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import {
  requestLogger,
  responseLogger,
} from './middleware/requestResponse.middleware.js';
import authRouter from './modules/auth/auth.routes.js';
import courseRouter from './modules/courses/course.routes.js';
import userRouter from './modules/user/user.routes.js';
import analyticsRouter from './modules/analytics/analytics.routes.js';
import progressRouter from './modules/progress/progress.routes.js';
import notificationRouter from './modules/notifications/notification.routes.js';
import roleConfigRouter from './modules/roles/roleConfig.routes.js';
import roadmapRouter from './modules/roadmaps/roadmap.routes.js';
import quizRouter from './modules/quizzes/quiz.routes.js';
import flashcardRouter from './modules/flashcards/flashcard.routes.js';
import challengeRouter from './modules/challenges/challenge.routes.js';
import subjectRouter from './modules/subjects/subject.routes.js';
import lessonRouter from './modules/subjects/lesson.routes.js';
import aiTutorRouter from './modules/aiTutor/aiTutor.routes.js';
import dashboardRouter from './modules/dashboard/dashboard.routes.js';
import focusRouter from './modules/focus/focus.routes.js';
import plannerRouter from './modules/planner/planner.routes.js';
import noteRouter from './modules/notes/note.routes.js';
import leaderboardRouter from './modules/leaderboard/leaderboard.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger-output.js';

// import paymentRouter from './modules/payment/payment.routes.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';
import './config/passport.js';

// Initialize the Express application
const app: Application = express();

// --- Middleware ---
// Enable Cross-Origin Resource Sharing
// Build allowed origins from env — supports comma-separated list for multiple deployments
const allowedOrigins = [
  'http://localhost:5173',   // Vite dev (local, non-Docker)
  'http://localhost:3060',   // nginx Docker dev port
  'http://localhost:3000',
  'http://frontend:5173',   // internal Docker network
  'https://vormirex-backend.vercel.app', // Backend Swagger domain
  // Vercel / any extra origins set in env (comma-separated)
  ...(process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map((u) => u.trim())
    : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests (no origin header) and whitelisted origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin '${origin}' not allowed`));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// --- Swagger CDN Configuration & Middleware ---
const swaggerOptions = {
  customCssUrl: 'https://unpkg.com/swagger-ui-dist@5.32.6/swagger-ui.css',
  customJs: [
    'https://unpkg.com/swagger-ui-dist@5.32.6/swagger-ui-bundle.js',
    'https://unpkg.com/swagger-ui-dist@5.32.6/swagger-ui-standalone-preset.js',
  ],
};

// Mount Swagger UI before global helmet middleware so that it is not blocked by strict Content Security Policies
app.use(
  '/api-docs',
  (helmet as any)({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://unpkg.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://unpkg.com'],
        imgSrc: ["'self'", 'data:', 'https://unpkg.com'],
      },
    },
  }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions)
);

// Secure the app by setting various HTTP headers
app.use((helmet as unknown as () => any)());
app.use(requestLogger);
app.use(responseLogger);
// Enable the Express app to parse JSON-formatted request bodies
app.use(express.json({ limit: '10kb' })); // Limit payload size for security
app.use(cookieParser());

// --- Routes ---

app.get('/', (req: Request, res: Response) => {
  res.send('Vormirex API is running...');
});

// Mount the application routes AFTER core middleware
app.use('/api/auth', authRouter);
app.use('/api/courses', courseRouter);
app.use('/api/subjects', subjectRouter);
app.use('/api/lessons', lessonRouter);
app.use('/api/ai-tutor', aiTutorRouter);
app.use('/api/users', userRouter);
app.use('/api/roadmaps', roadmapRouter);
app.use('/api/quizzes', quizRouter);
app.use('/api/flashcards', flashcardRouter);
app.use('/api/challenges', challengeRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/progress', progressRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/roles', roleConfigRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/focus', focusRouter);
app.use('/api/planner', plannerRouter);
app.use('/api/notes', noteRouter);
app.use('/api/leaderboard', leaderboardRouter);
// app.use('/api/payments', paymentRouter);

// --- Centralized Error Handler ---
// This must be the LAST middleware added to the app.
app.use(errorHandler);

export default app;
