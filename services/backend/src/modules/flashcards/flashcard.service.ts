import mongoose from 'mongoose';
import FlashcardDeck from './flashcardDeck.model.js';
import Flashcard from './flashcard.model.js';
import FlashcardProgress from './flashcardProgress.model.js';
import FlashcardSession from './flashcardSession.model.js';
import User from '../user/user.model.js';

export const getDecks = async (userId: string, subjectId?: string) => {
  const matchStage: any = { isPublic: true };
  if (subjectId) matchStage.subjectId = subjectId;

  return await FlashcardDeck.aggregate([
    { $match: matchStage },
    {
      $lookup: {
        from: 'flashcardprogresses', 
        let: { deckId: '$_id' },
        pipeline: [
          { 
            $match: { 
              $expr: { 
                $and: [
                  { $eq: ['$deckId', '$$deckId'] },
                  { $eq: ['$userId', new mongoose.Types.ObjectId(userId)] }
                ]
              } 
            } 
          }
        ],
        as: 'userProgress'
      }
    },
    {
      $addFields: {
        cardsStudied: { $size: '$userProgress' },
        averageAccuracy: {
          $cond: {
            if: { $gt: [{ $size: '$userProgress' }, 0] },
            then: {
              $multiply: [
                {
                  $divide: [
                    {
                      $size: {
                        $filter: {
                          input: '$userProgress',
                          as: 'prog',
                          cond: { $eq: ['$$prog.lastRating', 'correct'] }
                        }
                      }
                    },
                    { $size: '$userProgress' }
                  ]
                },
                100
              ]
            },
            else: 0
          }
        }
      }
    },
    { $project: { userProgress: 0 } }
  ]);
};

export const getDeckCards = async (userId: string, deckId: string) => {
  return await Flashcard.aggregate([
    { $match: { deckId: new mongoose.Types.ObjectId(deckId) } },
    {
      $lookup: {
        from: 'flashcardprogresses',
        let: { cardId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$cardId', '$$cardId'] },
                  { $eq: ['$userId', new mongoose.Types.ObjectId(userId)] }
                ]
              }
            }
          }
        ],
        as: 'progress'
      }
    },
    {
      $unwind: {
        path: '$progress',
        preserveNullAndEmptyArrays: true
      }
    }
  ]);
};

export const getDueCards = async (userId: string, deckId: string) => {
  // Spaced Repetition Engine
  // 1. Find cards where nextReviewDate <= now OR they don't have a progress document
  
  const allCards = await Flashcard.find({ deckId });
  const cardIds = allCards.map(c => c._id);

  const progresses = await FlashcardProgress.find({
    userId,
    cardId: { $in: cardIds }
  });

  const dueProgresses = progresses.filter(p => p.nextReviewDate <= new Date());
  const seenCardIds = progresses.map(p => p.cardId.toString());

  // Cards never seen before
  const unseenCards = allCards.filter(c => !seenCardIds.includes(c._id.toString()));

  const dueCardIds = dueProgresses.map(p => p.cardId.toString());
  const dueCardsDb = allCards.filter(c => dueCardIds.includes(c._id.toString()));

  // Merge and sort
  const combined = [...unseenCards, ...dueCardsDb].map(card => {
    const progress = progresses.find(p => p.cardId.toString() === card._id.toString());
    let priority = 2; // unseen
    if (progress) {
      if (progress.lastRating === 'wrong') priority = 0; // Due immediately
      else if (progress.lastRating === 'close') priority = 1;
      else if (progress.lastRating === 'correct') priority = 3;
    }
    return { card, progress, priority };
  });

  // Sort by priority (wrong -> close -> unseen -> correct)
  combined.sort((a, b) => a.priority - b.priority);

  return combined;
};

export const submitProgress = async (userId: string, cardId: string, deckId: string, rating: 'wrong' | 'close' | 'correct', userAnswer?: string) => {
  let progress = await FlashcardProgress.findOne({ userId, cardId });

  const now = new Date();
  let nextReviewDate = new Date();

  // Spaced Repetition Logic (SM-2 Lite Algorithm)
  if (rating === 'wrong') {
    nextReviewDate = now; // Due immediately
  } else if (rating === 'close') {
    nextReviewDate.setDate(now.getDate() + 1); // Due tomorrow
  } else if (rating === 'correct') {
    const attempts = progress ? progress.attempts : 0;
    const daysToAdd = attempts === 0 ? 3 : (attempts * 2) + 3; // Scales exponentially
    nextReviewDate.setDate(now.getDate() + daysToAdd);
  }

  if (progress) {
    progress.lastRating = rating;
    progress.attempts += 1;
    progress.userAnswer = userAnswer || progress.userAnswer;
    progress.nextReviewDate = nextReviewDate;
    progress.lastReviewed = now;
    await progress.save();
  } else {
    progress = await FlashcardProgress.create({
      userId,
      cardId,
      deckId,
      lastRating: rating,
      attempts: 1,
      userAnswer,
      nextReviewDate,
      lastReviewed: now
    });
  }

  return progress;
};

export const completeSession = async (userId: string, deckId: string, results: { cardId: string, rating: 'wrong' | 'close' | 'correct' }[]) => {
  if (!results.length) return { score: 0, xpEarned: 0, leveledUp: false };

  let totalPoints = 0;
  const maxPoints = results.length * 10;

  for (const res of results) {
    if (res.rating === 'correct') totalPoints += 10;
    else if (res.rating === 'close') totalPoints += 5;
    // wrong = 0
  }

  const scorePercentage = Math.round((totalPoints / maxPoints) * 100);

  // Gamification Math: Base 10 + (score% x 30)
  let xpEarned = 10 + Math.round(scorePercentage * 0.3); 
  if (scorePercentage >= 80) xpEarned += 20; // Mastery Bonus

  const session = await FlashcardSession.create({
    userId,
    deckId,
    score: scorePercentage,
    xpEarned,
    results
  });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $inc: { xp: xpEarned } },
    { new: true }
  );

  return { session, xpEarned, newTotalXp: updatedUser?.xp };
};

export const getStats = async (userId: string) => {
  const userObjId = new mongoose.Types.ObjectId(userId);

  const overallStats = await FlashcardSession.aggregate([
    { $match: { userId: userObjId } },
    {
      $group: {
        _id: null,
        totalSessions: { $sum: 1 },
        averageSessionScore: { $avg: '$score' },
        decksCompleted: { $addToSet: '$deckId' }
      }
    }
  ]);

  const cardsStudied = await FlashcardProgress.countDocuments({ userId: userObjId });

  if (!overallStats.length) {
    return { totalCardsStudied: cardsStudied, averageAccuracy: 0, decksCompleted: 0 };
  }

  return {
    totalCardsStudied: cardsStudied,
    averageAccuracy: Math.round(overallStats[0].averageSessionScore),
    decksCompleted: overallStats[0].decksCompleted.length,
    totalSessions: overallStats[0].totalSessions
  };
};

export default {
  getDecks,
  getDeckCards,
  getDueCards,
  submitProgress,
  completeSession,
  getStats
};
