import mongoose from 'mongoose';
import { env } from './env.js';

/**
 * Establishes a connection to the MongoDB database.
 * It's configured to fail fast: if the connection fails, the application will exit.
 */
export const connectDB = async (): Promise<void> => {
  try {
    // Set strict query to false to allow for more flexible queries (optional but common)
    mongoose.set('strictQuery', false);

    // Attempt to connect to the database
    const connection = await mongoose.connect(env.DATABASE_URL);

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);

    // Listen for disconnection events
    mongoose.connection.on('disconnected', () => {
      console.log('🔴 MongoDB disconnected.');
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ MongoDB Connection Error: ${errorMessage}`);
    // Exit process with failure
    process.exit(1);
  }
};
