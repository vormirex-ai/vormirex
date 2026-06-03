import subjectRepository from './subject.repository.js';
import ChapterModel from './chapter.model.js';
import LessonModel from './lesson.model.js';
import SubjectProgressModel from './subjectProgress.model.js';
import { NotFoundError } from '../../utils/errors.js';
import { ISubject } from './subject.model.js';

class SubjectService {
  async create(subjectData: Partial<ISubject>) {
    return subjectRepository.create(subjectData);
  }

  async getById(subjectId: string) {
    const subject = await subjectRepository.findById(subjectId);
    if (!subject) {
      throw new NotFoundError('Subject not found');
    }
    return subject;
  }

  async getAll(
    page: number,
    limit: number,
    filter: Record<string, any>,
    userId?: string
  ) {
    if (userId) {
      return subjectRepository.findAllWithProgress(userId, page, limit, filter);
    }
    return subjectRepository.findAll(page, limit, filter);
  }

  async update(subjectId: string, updateData: Partial<ISubject>) {
    const subject = await subjectRepository.updateById(subjectId, updateData);
    if (!subject) {
      throw new NotFoundError('Subject not found');
    }
    return subject;
  }

  async remove(subjectId: string) {
    const subject = await subjectRepository.deleteById(subjectId);
    if (!subject) {
      throw new NotFoundError('Subject not found');
    }
    return { message: 'Subject deleted successfully' };
  }

  async getCurriculum(subjectId: string, userId: string) {
    const subject = await this.getById(subjectId);

    // 1. Fetch chapters sorted by sequenceOrder
    const chapters = await ChapterModel.find({ subjectId })
      .sort({ sequenceOrder: 1 })
      .lean()
      .exec();

    const chapterIds = chapters.map((c) => c._id);

    // 2. Fetch all lessons matching these chapters
    const lessons = await LessonModel.find({ chapterId: { $in: chapterIds } })
      .sort({ sequenceOrder: 1 })
      .lean()
      .exec();

    // 3. Fetch user progress
    const progress = await SubjectProgressModel.findOne({ userId, subjectId })
      .lean()
      .exec();
    const completedSet = new Set(
      progress ? progress.completedLessons.map((id) => id.toString()) : []
    );
    const activeMap = new Map(
      progress
        ? progress.activeLessons.map((l) => [
            l.lessonId.toString(),
            l.secondsWatched,
          ])
        : []
    );

    // 4. Construct sequential flat list of lessons to check locking
    const flatLessons: any[] = [];
    const chapterLessonsMap = new Map<string, any[]>();

    for (const chapter of chapters) {
      const chapterIdStr = chapter._id.toString();
      const chapterLessons = lessons.filter(
        (l) => l.chapterId.toString() === chapterIdStr
      );

      // Ensure sorted order
      chapterLessons.sort((a, b) => a.sequenceOrder - b.sequenceOrder);
      chapterLessonsMap.set(chapterIdStr, chapterLessons);
      flatLessons.push(...chapterLessons);
    }

    // 5. Evaluate locking states sequentially
    const processedLessonsMap = new Map<string, any>();
    for (let i = 0; i < flatLessons.length; i++) {
      const lesson = flatLessons[i];
      const lessonIdStr = lesson._id.toString();

      let status: 'Done' | 'In Progress' | 'Unlocked' | 'Locked' = 'Locked';
      let resumePoint = 0;

      if (completedSet.has(lessonIdStr)) {
        status = 'Done';
      } else if (
        i === 0 ||
        completedSet.has(flatLessons[i - 1]._id.toString())
      ) {
        status = 'Unlocked';
        if (activeMap.has(lessonIdStr)) {
          status = 'In Progress';
          resumePoint = activeMap.get(lessonIdStr) || 0;
        }
      } else {
        status = 'Locked';
      }

      processedLessonsMap.set(lessonIdStr, {
        ...lesson,
        status,
        resumePoint,
      });
    }

    // 6. Assemble nested structure with chapter states
    const curriculumChapters = chapters.map((chapter) => {
      const chapterIdStr = chapter._id.toString();
      const chapterLessons = chapterLessonsMap.get(chapterIdStr) || [];

      const processedLessons = chapterLessons.map((l) =>
        processedLessonsMap.get(l._id.toString())
      );

      // Evaluate chapter status
      let chapterStatus: 'Done' | 'In Progress' | 'Upcoming' = 'Upcoming';
      if (processedLessons.length > 0) {
        const allDone = processedLessons.every((l) => l.status === 'Done');
        const someStarted = processedLessons.some(
          (l) =>
            l.status === 'Done' ||
            l.status === 'In Progress' ||
            l.status === 'Unlocked'
        );

        if (allDone) {
          chapterStatus = 'Done';
        } else if (someStarted) {
          chapterStatus = 'In Progress';
        }
      }

      return {
        ...chapter,
        status: chapterStatus,
        lessons: processedLessons,
      };
    });

    return {
      subject,
      chapters: curriculumChapters,
      overallProgress: progress
        ? {
            completedCount: progress.completedLessons.length,
            totalLessons: flatLessons.length,
            studyTimeHours:
              Math.round((progress.totalStudyTimeSeconds / 3600) * 10) / 10,
            percentage:
              flatLessons.length > 0
                ? Math.round(
                    (progress.completedLessons.length / flatLessons.length) *
                      100
                  )
                : 0,
          }
        : {
            completedCount: 0,
            totalLessons: flatLessons.length,
            studyTimeHours: 0,
            percentage: 0,
          },
    };
  }

  async getContinueLesson(subjectId: string, userId: string) {
    // 1. Fetch chapters sorted by sequenceOrder
    const chapters = await ChapterModel.find({ subjectId })
      .sort({ sequenceOrder: 1 })
      .lean()
      .exec();

    const chapterIds = chapters.map((c) => c._id);

    // 2. Fetch all lessons matching these chapters
    const lessons = await LessonModel.find({ chapterId: { $in: chapterIds } })
      .sort({ sequenceOrder: 1 })
      .lean()
      .exec();

    // 3. Build flat sequence of lessons
    const flatLessons: any[] = [];
    for (const chapter of chapters) {
      const chapterLessons = lessons.filter(
        (l) => l.chapterId.toString() === chapter._id.toString()
      );
      chapterLessons.sort((a, b) => a.sequenceOrder - b.sequenceOrder);
      flatLessons.push(...chapterLessons);
    }

    if (flatLessons.length === 0) {
      throw new NotFoundError('No lessons found in this subject');
    }

    // 4. Fetch user progress
    const progress = await SubjectProgressModel.findOne({ userId, subjectId })
      .lean()
      .exec();
    const completedSet = new Set(
      progress ? progress.completedLessons.map((id) => id.toString()) : []
    );

    // 5. Scan sequentially to find the first incomplete, unlocked lesson
    for (let i = 0; i < flatLessons.length; i++) {
      const lesson = flatLessons[i];
      const lessonIdStr = lesson._id.toString();

      if (!completedSet.has(lessonIdStr)) {
        // This is the first incomplete lesson.
        // It is unlocked if it's the first lesson or the previous one is completed.
        if (i === 0 || completedSet.has(flatLessons[i - 1]._id.toString())) {
          return { lessonId: lesson._id };
        }
      }
    }

    // If all are completed, return the last lesson
    return { lessonId: flatLessons[flatLessons.length - 1]._id };
  }
}

export default new SubjectService();
