import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';
import aiTutorService from './aiTutor.service.js';
import LessonModel from '../subjects/lesson.model.js';
import AIChatModel from './aiChat.model.js';

describe('AI Tutor Service Unit Tests', () => {
  const mockUserId = new mongoose.Types.ObjectId().toString();
  const mockLessonId = new mongoose.Types.ObjectId().toString();
  const mockChapterId = new mongoose.Types.ObjectId().toString();

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('sendMessage', () => {
    it('should save user messages and tutor responses in the chat history', async () => {
      // 1. Mock Lesson lookup
      const mockLesson = {
        _id: mockLessonId,
        chapterId: mockChapterId,
        title: 'Integration by Parts',
        durationMinutes: 45,
        transcript: [
          { time: '00:14', text: 'Welcome to Chapter 5' },
          { time: '00:45', text: 'Today we will discuss integration by parts' },
        ],
      };

      const mockLessonQuery: any = {
        exec: jest.fn(() => Promise.resolve(mockLesson)) as any,
      };
      (jest.spyOn(LessonModel, 'findById') as any).mockReturnValue(
        mockLessonQuery
      );

      // 2. Mock AIChat lookup (returns null, meaning no conversation exists yet)
      (jest.spyOn(AIChatModel, 'findOne') as any).mockReturnValue({
        exec: jest.fn(() => Promise.resolve(null)) as any,
      });

      // 3. Spy on save to check what was saved
      const savedMessages: any[] = [];
      jest.spyOn(AIChatModel.prototype, 'save').mockImplementation(function (
        this: any
      ) {
        savedMessages.push(...this.messages);
        return Promise.resolve(this);
      });

      // 4. Send message (Gemini API key not configured, will trigger mock)
      const chat = await aiTutorService.sendMessage(
        mockUserId,
        mockLessonId,
        'Explain integration by parts',
        'explain'
      );

      // Assertions
      expect(chat.userId.toString()).toBe(mockUserId);
      expect(chat.lessonId.toString()).toBe(mockLessonId);
      expect(chat.messages).toHaveLength(2);

      // First message is user prompt with explain template wrapper
      expect(chat.messages[0].role).toBe('user');
      expect(chat.messages[0].content).toContain(
        'Explain the core concept in this part of the lesson transcript'
      );
      expect(chat.messages[0].content).toContain(
        'Explain integration by parts'
      );

      // Second message is model fallback response
      expect(chat.messages[1].role).toBe('model');
      expect(chat.messages[1].content).toContain(
        '[MOCK] This is a mock response'
      );
      expect(chat.messages[1].content).toContain('Integration by Parts');
    });
  });
});
