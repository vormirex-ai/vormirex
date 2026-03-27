import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env.js';
import CourseModel, { CourseLevel } from '../modules/courses/course.model.js';
import UserModel from '../modules/user/user.model.js';
import path from 'path';
import fs from 'fs';

const ASSETS_DIR = path.resolve(process.cwd(), '../frontend/src/assets');

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(filename: string) {
  if (!filename) return undefined;
  if (filename.startsWith('http')) return filename;
  
  const fullPath = path.join(ASSETS_DIR, filename);
  if (!fs.existsSync(fullPath)) {
    console.log(`[WARN] File not found: ${fullPath}`);
    return undefined;
  }
  
  try {
    console.log(`Uploading ${filename}...`);
    const result = await cloudinary.uploader.upload(fullPath, { folder: 'vormirex/courses', resource_type: 'auto' });
    return result.secure_url;
  } catch (err: any) {
    console.error(`[ERROR] uploading ${filename}:`, err.message);
    return undefined;
  }
}

const SPECIAL_COURSES = [
  {
    title: 'Exam Preparation Kit',
    subtitle: 'Your Pathway to Certification Success',
    description: 'Unlock your potential with our comprehensive exam preparation resources designed to boost confidence and ensure first-attempt success.',
    price: 0,
    thumbnail: 'exmprepkit.jpeg',
    careerImage: 'carrerincyber.jpeg',
    gainImage: 'gainincyber.jpeg',
    coursePdf: 'Cyber security weekly.pdf.pdf'
  },
  {
    title: 'Career Transition Programs',
    subtitle: 'Transform Your Career Journey',
    description: 'Navigate your career transition with confidence through our structured programs designed for professionals seeking new paths.',
    price: 0,
    thumbnail: 'carrertran.jpeg',
    careerImage: 'carrerincyber.jpeg',
    gainImage: 'gainincyber.jpeg',
    coursePdf: 'Data analysis weekly.pdf.pdf'
  },
  {
    title: 'AI-Powered Learning Paths',
    subtitle: 'Personalized Education for Maximum Impact',
    description: 'Experience the future of learning with our AI-driven platform that adapts to your unique learning style, pace, and goals.',
    price: 0,
    thumbnail: 'aipowered.jpeg',
    careerImage: 'carrerinaiml.png',
    gainImage: 'gainaiml.png',
    coursePdf: 'AI _ ML_Course– Complete Syllabus.pdf'
  }
];

async function run() {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log('Connected to DB...');

    let adminUser = await UserModel.findOne({ role: 'admin' });
    if (!adminUser) {
      adminUser = await UserModel.findOne();
    }
    if (!adminUser) {
      console.log('No users found. Creating a dummy instructor...');
      adminUser = await UserModel.create({
        name: 'System Admin',
        email: 'admin@vormirex.test',
        password: 'Password123!',
        role: 'admin',
        isEmailVerified: true,
      });
    }
    const instructorId = adminUser._id;

    for (const courseDef of SPECIAL_COURSES) {
      // Check if already exists
      const existing = await CourseModel.findOne({ title: courseDef.title });
      if (existing) {
        console.log(`[SKIP] Course already exists in DB: ${courseDef.title}`);
        continue;
      }

      console.log(`\n--- Seeding Course: ${courseDef.title} ---`);
      
      const thumbUrl = await uploadToCloudinary(courseDef.thumbnail);
      const careerUrl = await uploadToCloudinary(courseDef.careerImage);
      const gainUrl = await uploadToCloudinary(courseDef.gainImage);
      const pdfUrl = await uploadToCloudinary(courseDef.coursePdf);
      
      const newCourse = new CourseModel({
        title: courseDef.title,
        subtitle: courseDef.subtitle,
        description: courseDef.description,
        price: courseDef.price,
        thumbnail: thumbUrl || 'https://via.placeholder.com/800x600?text=No+Image',
        careerImage: careerUrl,
        gainImage: gainUrl,
        coursePdf: pdfUrl,
        instructorId,
        status: 'PUBLISHED',
        isHidden: false,
        level: CourseLevel.FOUNDATION,
        levels: [
          {
            level: 'FOUNDATION',
            modules: [
              {
                title: 'Getting Started',
                items: ['Introduction', 'Overview', 'Prerequisites'],
              },
            ],
          },
        ],
      });

      await newCourse.save();
      console.log(`✅ Successfully seeded: ${courseDef.title}`);
    }

    console.log('\n🎉 Specialized Courses Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

run();
