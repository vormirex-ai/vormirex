
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(process.cwd(), 'services/backend/.env') });

const checkUsers = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL not defined');
    }
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');

    // Dynamically import User model or define a lean schema
    const userSchema = new mongoose.Schema({ email: String, role: String, _id: mongoose.Types.ObjectId });
    const User = mongoose.model('User', userSchema);

    const users = await User.find({});
    console.log('Found users:', users);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkUsers();
