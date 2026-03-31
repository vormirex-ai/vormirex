import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env.js';
import CourseModel from '../modules/courses/course.model.js';
import path from 'path';
import fs from 'fs';

// Run from services/backend root
const ASSETS_DIR = path.resolve(process.cwd(), '../frontend/src/assets');

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const getSlug = (title: string) => {
  if (!title) return '';
  if (title.toLowerCase().includes('ai & machine learning')) return 'ai-ml-engineer';
  return title.toLowerCase()
    .replace(/ \/ /g, '-')
    .replace(/\//g, '-')
    .replace(/ & /g, '-')
    .replace(/ /g, '-');
};

const map: any = {
  'data-science': {
    thumbnail: 'whylearndatascince.jpeg',
    careerImage: 'carrerindatascience.jpeg',
    gainImage: 'gainindatascience.jpeg',
    heroVideo: 'https://res.cloudinary.com/dsgbhkzpg/video/upload/v1770353870/Data_Science_V_2_tweph4.mp4',
    coursePdf: 'Data analysis weekly.pdf.pdf'
  },
  'data-analysis': {
    thumbnail: 'whylearndataana.jpeg',
    careerImage: 'carrerindataana.jpeg',
    gainImage: 'gainindatascience.jpeg',
    heroVideo: 'https://res.cloudinary.com/dhtxeigzx/video/upload/v1769844972/DA_zw9avx.mp4',
    coursePdf: 'Data analysis weekly.pdf.pdf'
  },
  'cyber-security': {
    thumbnail: 'whylearncyber.jpg',
    careerImage: 'carrerincyber.jpeg',
    gainImage: 'gainincyber.jpeg',
    heroVideo: 'https://res.cloudinary.com/dsgbhkzpg/video/upload/v1770353841/Cyber_Security_Video_gkixm3.mp4',
    coursePdf: 'Cyber security weekly.pdf.pdf'
  },
  'ai-ml-engineer': {
    thumbnail: 'whyaiml.png',
    careerImage: 'carrerinaiml.png',
    gainImage: 'gainaiml.png',
    heroVideo: 'https://res.cloudinary.com/dhtxeigzx/video/upload/v1769753171/Blue_Futuristic_Artificial_Intelligence_Video_1_ubonrm.mp4',
    coursePdf: 'AI _ ML_Course– Complete Syllabus.pdf'
  },
  'exam-preparation-kit': {
    thumbnail: 'exmprepkit.jpeg',
    careerImage: 'carrerincyber.jpeg',
    gainImage: 'gainincyber.jpeg',
    coursePdf: 'Cyber security weekly.pdf.pdf'
  },
  'career-transition-programs': {
    thumbnail: 'carrertran.jpeg',
    careerImage: 'carrerincyber.jpeg',
    gainImage: 'gainincyber.jpeg',
    coursePdf: 'Data analysis weekly.pdf.pdf'
  },
  'ai-powered-learning-paths': {
    thumbnail: 'aipowered.jpeg',
    careerImage: 'carrerinaiml.png',
    gainImage: 'gainaiml.png',
    coursePdf: 'AI _ ML_Course– Complete Syllabus.pdf'
  }
};

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

async function run() {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log('Connected to DB...');

    const courses = await CourseModel.find();
    console.log(`Found ${courses.length} courses to migrate.`);

    for (const course of courses) {
      const slug = getSlug(course.title);
      const assets = map[slug] || map['cyber-security'];

      console.log(`\n--- Migrating Course: ${course.title} (Slug: ${slug}) ---`);
      
      const thumbUrl = await uploadToCloudinary(assets.thumbnail);
      const careerUrl = await uploadToCloudinary(assets.careerImage);
      const gainUrl = await uploadToCloudinary(assets.gainImage);
      const pdfUrl = await uploadToCloudinary(assets.coursePdf);
      
      if (thumbUrl) course.thumbnail = thumbUrl;
      course.heroVideo = assets.heroVideo;
      if (careerUrl) course.careerImage = careerUrl;
      if (gainUrl) course.gainImage = gainUrl;
      if (pdfUrl) course.coursePdf = pdfUrl;

      await course.save();
      console.log(`Successfully mapped URLs for ${course.title}`);
    }

    console.log('\n✅ Course Media Migration Complete!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

run();
