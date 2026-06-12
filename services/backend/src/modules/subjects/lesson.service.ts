import mongoose from 'mongoose';
import lessonRepository from './lesson.repository.js';
import SubjectProgressModel from './subjectProgress.model.js';
import ChapterModel from './chapter.model.js';
import LessonModel from './lesson.model.js';
import User from '../user/user.model.js';
import StudyLogModel from '../analytics/studyLog.model.js';
import { NotFoundError } from '../../utils/errors.js';

class LessonService {
  async getById(lessonId: string) {
    const lesson = await lessonRepository.findById(lessonId);
    if (!lesson) {
      throw new NotFoundError('Lesson not found');
    }
    return lesson;
  }

  async updateProgress(
    userId: string,
    lessonId: string,
    secondsWatched: number,
    durationWatchedIncrement: number
  ) {
    const lesson = await lessonRepository.findByIdWithSubject(lessonId);
    if (!lesson) {
      throw new NotFoundError('Lesson not found');
    }

    const subjectId = lesson.chapterId.subjectId;

    // Find or create progress record
    let progress = await SubjectProgressModel.findOne({ userId, subjectId });
    if (!progress) {
      progress = new SubjectProgressModel({ userId, subjectId });
    }

    // Increment cumulative study time
    progress.totalStudyTimeSeconds += durationWatchedIncrement;

    // Increment daily study log
    const user = await User.findById(userId);
    const timezone = user?.timezone || 'UTC';
    const dateString = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());

    await StudyLogModel.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId), dateString },
      { $inc: { secondsStudied: durationWatchedIncrement } },
      { upsert: true, new: true }
    );

    // Update active lesson watch offset
    const activeLessonIndex = progress.activeLessons.findIndex(
      (l: any) => l.lessonId.toString() === lessonId
    );

    if (activeLessonIndex > -1) {
      progress.activeLessons[activeLessonIndex].secondsWatched = secondsWatched;
      progress.activeLessons[activeLessonIndex].lastAccessedAt = new Date();
    } else {
      progress.activeLessons.push({
        lessonId: new mongoose.Types.ObjectId(lessonId) as any,
        secondsWatched,
        lastAccessedAt: new Date(),
      });
    }

    await progress.save();
    return progress;
  }

  async completeLesson(userId: string, lessonId: string) {
    const lesson = await lessonRepository.findByIdWithSubject(lessonId);
    if (!lesson) {
      throw new NotFoundError('Lesson not found');
    }

    const subjectId = lesson.chapterId.subjectId;

    // Find or create progress record
    let progress = await SubjectProgressModel.findOne({ userId, subjectId });
    if (!progress) {
      progress = new SubjectProgressModel({ userId, subjectId });
    }

    // Add to completed list if not already there
    const completedSet = new Set(
      progress.completedLessons.map((id) => id.toString())
    );
    if (!completedSet.has(lessonId)) {
      progress.completedLessons.push(
        new mongoose.Types.ObjectId(lessonId) as any
      );
    }

    // Remove from active lessons list
    progress.activeLessons = progress.activeLessons.filter(
      (l: any) => l.lessonId.toString() !== lessonId
    );

    await progress.save();

    // Find next sequential lesson to return
    // 1. Fetch chapters sorted by sequenceOrder
    const chapters = await ChapterModel.find({ subjectId })
      .sort({ sequenceOrder: 1 })
      .lean()
      .exec();

    const chapterIds = chapters.map((c) => c._id);

    // 2. Fetch all lessons matching these chapters
    const lessonsList = await LessonModel.find({
      chapterId: { $in: chapterIds },
    })
      .sort({ sequenceOrder: 1 })
      .lean()
      .exec();

    // 3. Build flat sequence of lessons
    const flatLessons: any[] = [];
    for (const chapter of chapters) {
      const chapterLessons = lessonsList.filter(
        (l) => l.chapterId.toString() === chapter._id.toString()
      );
      chapterLessons.sort((a, b) => a.sequenceOrder - b.sequenceOrder);
      flatLessons.push(...chapterLessons);
    }

    // 4. Find index of current lesson, next lesson is index + 1
    const currentIndex = flatLessons.findIndex(
      (l) => l._id.toString() === lessonId
    );
    let nextLessonId: string | null = null;
    if (currentIndex > -1 && currentIndex < flatLessons.length - 1) {
      nextLessonId = flatLessons[currentIndex + 1]._id.toString();
    }

    return {
      progress: {
        completedCount: progress.completedLessons.length,
        totalLessons: flatLessons.length,
        percentage:
          flatLessons.length > 0
            ? Math.round(
                (progress.completedLessons.length / flatLessons.length) * 100
              )
            : 0,
      },
      nextLessonId,
    };
  }
}

export default new LessonService();
