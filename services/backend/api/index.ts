import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../src/app.js';
import { connectDB } from '../src/config/database.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure database connection is established
  await connectDB();
  
  // Forward request to Express app
  app(req, res);
}
