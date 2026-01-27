import 'express-async-errors';
// Load environment variables before importing app
import { env } from './config/env.js';
import app from './app.js';
import { connectDB } from './config/database.js';
import { logger } from './config/logger.js';

/**
 * Starts the server.
 * This function first connects to the database and then starts the Express server.
 */
const startServer = async () => {
  // Connect to the database
  await connectDB();

  app.listen(env.PORT, '0.0.0.0', () => {
    logger.info(`🚀 Server is running on http://0.0.0.0:${env.PORT}`);
  });
};

startServer();
