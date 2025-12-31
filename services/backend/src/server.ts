import 'express-async-errors';
import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/database.js';
import { logger } from './config/logger.js';

/**
 * Starts the server.
 * This function first connects to the database and then starts the Express server.
 */
const startServer = async () => {
  // Connect to the database
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(`🚀 Server is running on http://localhost:${env.PORT}`);
  });
};

startServer();
