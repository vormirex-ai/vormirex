import mongoose from 'mongoose';
import { connectDB } from '../config/database.js';
import CourseModel from '../modules/courses/course.model.js';
import SubjectModel from '../modules/subjects/subject.model.js';
import ChapterModel from '../modules/subjects/chapter.model.js';
import LessonModel from '../modules/subjects/lesson.model.js';

const runMigration = async () => {
  console.log('🏁 Starting migration: Courses to Subjects...');

  // 1. Connect to Database
  await connectDB();

  try {
    // 2. Fetch all courses
    const courses = await CourseModel.find().exec();
    console.log(`Found ${courses.length} courses to migrate.`);

    let subjectCount = 0;
    let chapterCount = 0;
    let lessonCount = 0;

    for (const course of courses) {
      // Check if already migrated to avoid duplicates
      const existing = await SubjectModel.findOne({
        title: course.title,
      }).exec();
      if (existing) {
        console.log(`⚠️ Subject "${course.title}" already exists, skipping.`);
        continue;
      }

      // Create new Subject
      const subject = new SubjectModel({
        title: course.title,
        subtitle: course.subtitle || '',
        description: course.description,
        icon: course.thumbnail, // thumbnail as icon URL
        price: course.price,
        isPro: course.price > 0,
        hasCertificate: true,
        status: course.status,
        tags: course.tags || [],
      });

      await subject.save();
      subjectCount++;

      // Iterate through levels (Foundation / Advanced)
      for (
        let levelIndex = 0;
        levelIndex < course.levels.length;
        levelIndex++
      ) {
        const levelBlock = course.levels[levelIndex];

        // Create Chapter
        const chapter = new ChapterModel({
          subjectId: subject._id,
          title: levelBlock.level,
          sequenceOrder: levelIndex + 1,
        });

        await chapter.save();
        chapterCount++;

        // Iterate through modules in this level block
        for (
          let modIndex = 0;
          modIndex < levelBlock.modules.length;
          modIndex++
        ) {
          const mod = levelBlock.modules[modIndex];

          // Generate time-coded transcript lines from module items list
          const transcriptLines = mod.items.map((item, index) => {
            const minutes = String(index * 2).padStart(2, '0');
            return {
              time: `00:${minutes}`,
              text: item,
            };
          });

          // Create Lesson
          const lesson = new LessonModel({
            chapterId: chapter._id,
            title: mod.title,
            durationMinutes: 30, // default duration
            videoUrl:
              course.heroVideo ||
              'https://res.cloudinary.com/dsgbhkzpg/video/upload/v1770353870/Data_Science_V_2_tweph4.mp4',
            transcript: transcriptLines,
            sequenceOrder: modIndex + 1,
          });

          await lesson.save();
          lessonCount++;
        }
      }

      console.log(`✅ Migrated course "${course.title}" successfully.`);
    }

    console.log(`\n🎉 Migration Complete:`);
    console.log(`- Created Subjects: ${subjectCount}`);
    console.log(`- Created Chapters: ${chapterCount}`);
    console.log(`- Created Lessons:  ${lessonCount}`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Database connection closed.');
    process.exit(0);
  }
};

runMigration();
