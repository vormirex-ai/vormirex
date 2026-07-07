import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import flashcardService from './flashcard.service.js';
import FlashcardDeck from './flashcardDeck.model.js';
import Flashcard from './flashcard.model.js';
import FlashcardProgress from './flashcardProgress.model.js';
import FlashcardSession from './flashcardSession.model.js';
import User from '../user/user.model.js';

jest.mock('../leaderboard/leaderboard.service.js', () => ({
  awardXp: jest.fn().mockImplementation(() => Promise.resolve()),
  getLeaderboardData: jest.fn(),
}));

import Notification from '../notifications/notification.model.js';
import mongoose from 'mongoose';

describe('Flashcard Service Unit Tests', () => {
  const mockUserId = '60d0fe4f5311236168a109ca';
  const mockDeckId = '60d0fe4f5311236168a109cb';

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('getDecks', () => {
    it('should query decks using aggregation pipeline', async () => {
      const mockDecks = [
        {
          _id: mockDeckId,
          name: 'Mathematics Fundamentals',
          totalCards: 10,
          dueCardsCount: 5,
        },
      ];
      jest.spyOn(FlashcardDeck, 'aggregate').mockResolvedValue(mockDecks as any);

      const result = await flashcardService.getDecks(mockUserId, 'math');
      expect(FlashcardDeck.aggregate).toHaveBeenCalled();
      expect(result).toEqual(mockDecks);
    });
  });

  describe('getDueCards', () => {
    it('should fetch and cap returned cards based on the limit parameter', async () => {
      const mockCards = Array.from({ length: 10 }, (_, i) => ({
        _id: new mongoose.Types.ObjectId(),
        deckId: mockDeckId,
        question: `Question ${i}`,
        answer: `Answer ${i}`,
      }));

      jest.spyOn(Flashcard, 'find').mockResolvedValue(mockCards as any);
      jest.spyOn(FlashcardProgress, 'find').mockResolvedValue([]);

      const result = await flashcardService.getDueCards(mockUserId, mockDeckId, 5);
      expect(result.length).toBe(5);
    });
  });

  describe('completeSession', () => {
    it('should compute scores, count easy/ok/hard grades, and update separate flashcardDayStreak', async () => {
      const mockUser = {
        _id: mockUserId,
        xp: 100,
        timezone: 'UTC',
        flashcardStreak: {
          current: 1,
          longest: 1,
          lastActivityDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
        },
        save: jest.fn().mockImplementation(function (this: any) {
          return Promise.resolve(this);
        }),
      };

      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(FlashcardSession, 'create').mockResolvedValue({} as any);
      jest.spyOn(FlashcardDeck, 'findById').mockResolvedValue({ name: 'Mathematics Fundamentals' } as any);
      (jest.spyOn(Notification, 'create') as any).mockResolvedValue({} as any);

      const results = [
        { cardId: 'c1', rating: 'correct' as const },
        { cardId: 'c2', rating: 'close' as const },
        { cardId: 'c3', rating: 'wrong' as const },
      ];

      const res = await flashcardService.completeSession(mockUserId, mockDeckId, results);

      expect(res.summary).toEqual({ easy: 1, ok: 1, hard: 1 });
      expect(mockUser.flashcardStreak.current).toBe(2);
      expect(mockUser.save).toHaveBeenCalled();
    });
  });

  describe('getStats', () => {
    it('should aggregate global stats and return due counts, mastered counts, and streak info', async () => {
      const mockUser = {
        _id: mockUserId,
        flashcardStreak: { current: 5 },
      };

      const mockCards = [
        { _id: 'c1' },
        { _id: 'c2' },
        { _id: 'c3' },
      ];

      const mockProgress = [
        { cardId: 'c1', lastRating: 'correct', nextReviewDate: new Date(Date.now() + 100000) }, // Not due
        { cardId: 'c2', lastRating: 'wrong', nextReviewDate: new Date(Date.now() - 10000) }, // Due
      ];

      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(Flashcard, 'countDocuments').mockResolvedValue(3);
      jest.spyOn(FlashcardProgress, 'countDocuments').mockResolvedValue(1); // Mastered
      jest.spyOn(Flashcard, 'find').mockReturnValue({
        select: jest.fn().mockReturnValue(Promise.resolve(mockCards)),
      } as any);
      jest.spyOn(FlashcardProgress, 'find').mockResolvedValue(mockProgress as any);
      jest.spyOn(FlashcardSession, 'aggregate').mockResolvedValue([]);

      const stats = await flashcardService.getStats(mockUserId);

      expect(stats.totalCards).toBe(3);
      expect(stats.masteredCount).toBe(1);
      // 'c2' is due (progress in past), 'c3' is unseen, so 2 due today
      expect(stats.dueTodayCount).toBe(2);
      expect(stats.streak).toBe(5);
    });
  });
});
