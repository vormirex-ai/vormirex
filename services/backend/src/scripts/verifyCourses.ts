
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import CourseModel from '../modules/courses/course.model.js';

// Load env vars
dotenv.config({ path: path.join(process.cwd(), '../../env/backend/.env') });

const verifyCourses = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL not defined');
    }
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');

    const courses = await CourseModel.find({}, 'title _id level status');
    console.log(`Found ${courses.length} courses:`);
    courses.forEach(c => {
      console.log(`- [${c._id}] ${c.title} (${c.level}) - ${c.status}`);
    });

    if (courses.length !== 4) {
      console.warn('WARNING: Expected 4 courses, found ' + courses.length);
    } else {
      console.log('Verification SUCCESS: 4 courses found.');
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error verifying courses:', error);
    process.exit(1);
  }
};

verifyCourses();
