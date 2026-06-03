import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';
import subjectService from './subject.service.js';
import ChapterModel from './chapter.model.js';
import LessonModel from './lesson.model.js';
import SubjectProgressModel from './subjectProgress.model.js';

describe('Subject Service Unit Tests', () => {
  const mockUserId = new mongoose.Types.ObjectId().toString();
  const mockSubjectId = new mongoose.Types.ObjectId().toString();
  const mockChapter1Id = new mongoose.Types.ObjectId();
  const mockChapter2Id = new mongoose.Types.ObjectId();

  const mockLesson1Id = new mongoose.Types.ObjectId();
  const mockLesson2Id = new mongoose.Types.ObjectId();
  const mockLesson3Id = new mongoose.Types.ObjectId();

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('getCurriculum', () => {
    it('should calculate locking states and chapter statuses sequentially', async () => {
      // 1. Mock Subject lookup
      const mockSubject = {
        _id: mockSubjectId,
        title: 'Mathematics',
        description: 'Calculus course',
        status: 'PUBLISHED',
      };
      jest
        .spyOn(subjectService, 'getById')
        .mockResolvedValue(mockSubject as any);

      // 2. Mock Chapters lookup
      const mockChapters = [
        {
          _id: mockChapter1Id,
          title: 'Limits',
          sequenceOrder: 1,
          subjectId: mockSubjectId,
        },
        {
          _id: mockChapter2Id,
          title: 'Derivatives',
          sequenceOrder: 2,
          subjectId: mockSubjectId,
        },
      ];

      const mockChapterQuery: any = {
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn(() => Promise.resolve(mockChapters)) as any,
      };
      (jest.spyOn(ChapterModel, 'find') as any).mockReturnValue(
        mockChapterQuery
      );

      // 3. Mock Lessons lookup
      const mockLessons = [
        {
          _id: mockLesson1Id,
          title: 'Intro to Limits',
          chapterId: mockChapter1Id,
          durationMinutes: 15,
          sequenceOrder: 1,
        },
        {
          _id: mockLesson2Id,
          title: 'One-Sided Limits',
          chapterId: mockChapter1Id,
          durationMinutes: 20,
          sequenceOrder: 2,
        },
        {
          _id: mockLesson3Id,
          title: 'Intro to Derivatives',
          chapterId: mockChapter2Id,
          durationMinutes: 25,
          sequenceOrder: 1,
        },
      ];

      const mockLessonQuery: any = {
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn(() => Promise.resolve(mockLessons)) as any,
      };
      (jest.spyOn(LessonModel, 'find') as any).mockReturnValue(mockLessonQuery);

      // 4. Mock Progress lookup (Lesson 1 completed, Lesson 2 active/in progress, Lesson 3 locked)
      const mockProgress = {
        userId: mockUserId,
        subjectId: mockSubjectId,
        completedLessons: [mockLesson1Id],
        activeLessons: [
          {
            lessonId: mockLesson2Id,
            secondsWatched: 120,
            lastAccessedAt: new Date(),
          },
        ],
        totalStudyTimeSeconds: 500,
      };

      const mockProgressQuery: any = {
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn(() => Promise.resolve(mockProgress)) as any,
      };
      (jest.spyOn(SubjectProgressModel, 'findOne') as any).mockReturnValue(
        mockProgressQuery
      );

      // Execute service
      const curriculum = await subjectService.getCurriculum(
        mockSubjectId,
        mockUserId
      );

      // Assertions
      expect(curriculum.subject.title).toBe('Mathematics');
      expect(curriculum.chapters).toHaveLength(2);

      // Chapter 1 (Limits) contains Lesson 1 and Lesson 2
      const limitsChapter = curriculum.chapters[0];
      expect(limitsChapter.status).toBe('In Progress');
      expect(limitsChapter.lessons).toHaveLength(2);

      // Lesson 1 is completed (status: Done)
      expect(limitsChapter.lessons[0]._id.toString()).toBe(
        mockLesson1Id.toString()
      );
      expect(limitsChapter.lessons[0].status).toBe('Done');

      // Lesson 2 is in progress (status: In Progress, resumePoint: 120)
      expect(limitsChapter.lessons[1]._id.toString()).toBe(
        mockLesson2Id.toString()
      );
      expect(limitsChapter.lessons[1].status).toBe('In Progress');
      expect(limitsChapter.lessons[1].resumePoint).toBe(120);

      // Chapter 2 (Derivatives) contains Lesson 3 (Intro to Derivatives)
      // Since Lesson 2 (preceding) is incomplete, Lesson 3 must be Locked
      const derivativesChapter = curriculum.chapters[1];
      expect(derivativesChapter.status).toBe('Upcoming');
      expect(derivativesChapter.lessons).toHaveLength(1);
      expect(derivativesChapter.lessons[0]._id.toString()).toBe(
        mockLesson3Id.toString()
      );
      expect(derivativesChapter.lessons[0].status).toBe('Locked');

      // Overall Progress Aggregations
      expect(curriculum.overallProgress.completedCount).toBe(1);
      expect(curriculum.overallProgress.totalLessons).toBe(3);
      expect(curriculum.overallProgress.percentage).toBe(33);
    });
  });

  describe('getContinueLesson', () => {
    it('should return the first incomplete, unlocked lesson', async () => {
      // Setup Chapters/Lessons queries
      const mockChapters = [
        {
          _id: mockChapter1Id,
          title: 'Limits',
          sequenceOrder: 1,
          subjectId: mockSubjectId,
        },
      ];
      const mockChapterQuery: any = {
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn(() => Promise.resolve(mockChapters)) as any,
      };
      (jest.spyOn(ChapterModel, 'find') as any).mockReturnValue(
        mockChapterQuery
      );

      const mockLessons = [
        {
          _id: mockLesson1Id,
          title: 'Intro to Limits',
          chapterId: mockChapter1Id,
          durationMinutes: 15,
          sequenceOrder: 1,
        },
        {
          _id: mockLesson2Id,
          title: 'One-Sided Limits',
          chapterId: mockChapter1Id,
          durationMinutes: 20,
          sequenceOrder: 2,
        },
      ];
      const mockLessonQuery: any = {
        sort: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn(() => Promise.resolve(mockLessons)) as any,
      };
      (jest.spyOn(LessonModel, 'find') as any).mockReturnValue(mockLessonQuery);

      // Mock progress: Lesson 1 is completed. Lesson 2 is incomplete.
      const mockProgress = {
        completedLessons: [mockLesson1Id],
        activeLessons: [],
      };
      const mockProgressQuery: any = {
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn(() => Promise.resolve(mockProgress)) as any,
      };
      (jest.spyOn(SubjectProgressModel, 'findOne') as any).mockReturnValue(
        mockProgressQuery
      );

      // Execute service
      const result = await subjectService.getContinueLesson(
        mockSubjectId,
        mockUserId
      );

      // Lesson 2 is the next lesson to continue
      expect(result.lessonId.toString()).toBe(mockLesson2Id.toString());
    });
  });
});
