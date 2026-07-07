import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import challengeService from './challenge.service.js';
import User from '../user/user.model.js';
import QuizQuestion from '../quizzes/quizQuestion.model.js';
import ChallengeResult from './challengeResult.model.js';

jest.mock('../leaderboard/leaderboard.service.js', () => ({
  awardXp: jest.fn().mockImplementation(() => Promise.resolve()),
  getLeaderboardData: jest.fn(),
}));

describe('Daily Challenge Service Unit Tests', () => {
  const mockUserId = '60d0fe4f5311236168a109ca';

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('getTodayChallenge', () => {
    it('should throw error if user not found', async () => {
      jest.spyOn(User, 'findById').mockResolvedValue(null as any);
      await expect(challengeService.getTodayChallenge(mockUserId)).rejects.toThrow('User not found');
    });

    it('should throw error if user has no selected subjects', async () => {
      const mockUser = {
        learningPreferences: { selectedSubjects: [] }
      };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      await expect(challengeService.getTodayChallenge(mockUserId)).rejects.toThrow(
        'Please select at least one subject in your learning preferences.'
      );
    });

    it('should return completed true if challenge already completed today', async () => {
      const mockUser = {
        timezone: 'UTC',
        learningPreferences: { selectedSubjects: ['math'] }
      };
      const mockResult = {
        userId: mockUserId,
        score: 80,
      };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(ChallengeResult, 'findOne').mockResolvedValue(mockResult as any);

      const result = await challengeService.getTodayChallenge(mockUserId);
      expect(result.completed).toBe(true);
      expect(result.challengeResult).toEqual(mockResult);
    });

    it('should return 5 deterministic questions if not completed today', async () => {
      const mockUser = {
        timezone: 'UTC',
        learningPreferences: { selectedSubjects: ['math', 'science'] }
      };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(ChallengeResult, 'findOne').mockResolvedValue(null as any);

      // Return a set of mock question IDs
      const mockQuestionIds = Array.from({ length: 10 }, (_, i) => ({
        _id: `q_id_${i}`,
        subjectId: i % 2 === 0 ? 'math' : 'science',
      }));

      jest.spyOn(QuizQuestion as any, 'find').mockImplementation((query: any) => {
        if (query._id) {
          // Fetch specific details
          const idList = query._id.$in;
          return {
            select: jest.fn().mockImplementation(() => {
              return Promise.resolve(
                idList.map((id: string) => ({
                  _id: id,
                  questionText: `Question text for ${id}`,
                  options: ['A', 'B', 'C', 'D'],
                  correctAnswer: 'A',
                  explanation: 'Explanation text',
                  toObject: function () {
                    return {
                      _id: this._id,
                      questionText: this.questionText,
                      options: this.options,
                      correctAnswer: this.correctAnswer,
                      explanation: this.explanation,
                    };
                  },
                }))
              );
            }),
            then: jest.fn().mockImplementation((resolve: any) => {
              return resolve(
                idList.map((id: string) => ({
                  _id: id,
                  questionText: `Question text for ${id}`,
                  options: ['A', 'B', 'C', 'D'],
                  correctAnswer: 'A',
                  explanation: 'Explanation text',
                  toObject: function () {
                    return {
                      _id: this._id,
                      questionText: this.questionText,
                      options: this.options,
                      correctAnswer: this.correctAnswer,
                      explanation: this.explanation,
                    };
                  },
                }))
              );
            })
          } as any;
        }
        
        // Return chainable mock for first find query
        return {
          select: (jest.fn() as any).mockResolvedValue(mockQuestionIds),
          then: jest.fn().mockImplementation((resolve: any) => resolve(mockQuestionIds))
        } as any;
      });

      const result1 = await challengeService.getTodayChallenge(mockUserId);
      const result2 = await challengeService.getTodayChallenge(mockUserId);

      expect(result1.completed).toBe(false);
      expect(result1.questions).toHaveLength(5);
      // Verify sanitization: correctAnswer and explanation omitted
      expect(result1.questions![0].correctAnswer).toBeUndefined();
      expect(result1.questions![0].explanation).toBeUndefined();

      // Verify determinism
      expect(result1.questions).toEqual(result2.questions);
    });
  });

  describe('submitChallenge', () => {
    it('should throw error if duplicate submission today', async () => {
      const mockUser = {
        timezone: 'UTC',
      };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(ChallengeResult, 'findOne').mockResolvedValue({ _id: 'existing_result' } as any);

      await expect(challengeService.submitChallenge(mockUserId, [])).rejects.toThrow(
        "You have already completed today's daily challenge."
      );
    });

    it('should grade answers and reward 30 XP per correct answer correctly', async () => {
      const mockUser = {
        timezone: 'UTC',
        xp: 100,
        challengeStreak: { current: 1, longest: 1, lastActivityDate: new Date() },
        save: (jest.fn() as any).mockResolvedValue(true),
      };
      jest.spyOn(User, 'findById').mockResolvedValue(mockUser as any);
      jest.spyOn(ChallengeResult, 'findOne').mockResolvedValue(null as any);

      const mockQuestions = [
        { _id: 'q1', correctAnswer: 'A' },
        { _id: 'q2', correctAnswer: 'B' },
        { _id: 'q3', correctAnswer: 'C' },
        { _id: 'q4', correctAnswer: 'D' },
        { _id: 'q5', correctAnswer: 'A' },
      ];
      jest.spyOn(QuizQuestion as any, 'findById').mockImplementation((id: any) => {
        return Promise.resolve(mockQuestions.find(q => q._id === id.toString()) as any);
      });

      const userAnswers = [
        { questionId: 'q1', selectedOption: 'A', timeToAnswer: 5000 },  // Correct (+30 XP)
        { questionId: 'q2', selectedOption: 'B', timeToAnswer: 12000 }, // Correct (+30 XP)
        { questionId: 'q3', selectedOption: 'D', timeToAnswer: 3000 },  // Wrong (+0 XP)
        { questionId: 'q4', selectedOption: 'D', timeToAnswer: 8000 },  // Correct (+30 XP)
        { questionId: 'q5', selectedOption: 'B', timeToAnswer: 4000 },  // Wrong (+0 XP)
      ];

      // XP: 3 correct * 30 XP = 90 XP total.
      jest.spyOn(ChallengeResult, 'create').mockImplementation((data: any) => Promise.resolve(data) as any);

      const result = await challengeService.submitChallenge(mockUserId, userAnswers);

      expect(result.xpEarned).toBe(90);
      expect(result.newTotalXp).toBe(190);
      expect(mockUser.xp).toBe(190);
      expect(mockUser.save).toHaveBeenCalled();
    });
  });

  describe('verifyQuestionAnswer', () => {
    it('should verify correct answer and return correct status, explanation and 30 XP', async () => {
      const mockQuestion = {
        _id: 'q1',
        correctAnswer: 'A',
        explanation: 'Correct explanation',
      };
      jest.spyOn(QuizQuestion, 'findById').mockResolvedValue(mockQuestion as any);

      const result = await challengeService.verifyQuestionAnswer('q1', 'A');
      expect(result).toEqual({
        isCorrect: true,
        correctAnswer: 'A',
        explanation: 'Correct explanation',
        xpEarned: 30,
      });
    });

    it('should verify incorrect answer and return explanation and 0 XP', async () => {
      const mockQuestion = {
        _id: 'q1',
        correctAnswer: 'A',
        explanation: 'Correct explanation',
      };
      jest.spyOn(QuizQuestion, 'findById').mockResolvedValue(mockQuestion as any);

      const result = await challengeService.verifyQuestionAnswer('q1', 'B');
      expect(result).toEqual({
        isCorrect: false,
        correctAnswer: 'A',
        explanation: 'Correct explanation',
        xpEarned: 0,
      });
    });
  });
});
