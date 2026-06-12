import mongoose from 'mongoose';
import FlashcardDeck from './flashcardDeck.model.js';
import Flashcard from './flashcard.model.js';
import FlashcardProgress from './flashcardProgress.model.js';
import FlashcardSession from './flashcardSession.model.js';
import User from '../user/user.model.js';

const getDateString = (date: Date, tz: string): string => {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

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
      $lookup: {
        from: 'flashcards',
        localField: '_id',
        foreignField: 'deckId',
        as: 'deckCards'
      }
    },
    {
      $addFields: {
        totalCards: { $size: '$deckCards' },
        cardsStudied: { $size: '$userProgress' },
        dueCardsCount: {
          $size: {
            $filter: {
              input: '$deckCards',
              as: 'card',
              cond: {
                $let: {
                  vars: {
                    matchingProgress: {
                      $filter: {
                        input: '$userProgress',
                        as: 'p',
                        cond: { $eq: ['$$p.cardId', '$$card._id'] }
                      }
                    }
                  },
                  in: {
                    $or: [
                      { $eq: [{ $size: '$$matchingProgress' }, 0] },
                      {
                        $lte: [
                          { $arrayElemAt: ['$$matchingProgress.nextReviewDate', 0] },
                          new Date()
                        ]
                      }
                    ]
                  }
                }
              }
            }
          }
        },
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
    { $project: { userProgress: 0, deckCards: 0 } }
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

export const getDueCards = async (userId: string, deckId: string, limit?: number) => {
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

  if (limit !== undefined && limit > 0) {
    return combined.slice(0, limit);
  }

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
  if (!results.length) return { score: 0, xpEarned: 0, leveledUp: false, summary: { easy: 0, ok: 0, hard: 0 } };

  let totalPoints = 0;
  const maxPoints = results.length * 10;
  let easy = 0;
  let ok = 0;
  let hard = 0;

  for (const res of results) {
    if (res.rating === 'correct') {
      totalPoints += 10;
      easy += 1;
    } else if (res.rating === 'close') {
      totalPoints += 5;
      ok += 1;
    } else {
      hard += 1;
    }
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

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Manage Flashcard Day Streak
  const timezone = user.timezone || 'UTC';
  const todayString = getDateString(new Date(), timezone);
  const lastActivityDate = user.flashcardStreak?.lastActivityDate
    ? new Date(user.flashcardStreak.lastActivityDate)
    : null;

  if (!lastActivityDate) {
    user.flashcardStreak = {
      current: 1,
      longest: 1,
      lastActivityDate: new Date(),
    };
  } else {
    const lastActivityString = getDateString(lastActivityDate, timezone);
    if (lastActivityString !== todayString) {
      const todayDate = new Date(todayString);
      const lastDate = new Date(lastActivityString);
      const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        user.flashcardStreak.current += 1;
      } else {
        user.flashcardStreak.current = 1;
      }

      if (user.flashcardStreak.current > user.flashcardStreak.longest) {
        user.flashcardStreak.longest = user.flashcardStreak.current;
      }
      user.flashcardStreak.lastActivityDate = new Date();
    }
  }

  user.xp += xpEarned;
  await user.save();

  return { 
    session, 
    xpEarned, 
    newTotalXp: user.xp, 
    summary: { easy, ok, hard } 
  };
};

export const getStats = async (userId: string) => {
  const userObjId = new mongoose.Types.ObjectId(userId);

  // 1. Get user streak
  const user = await User.findById(userId);
  const streak = user?.flashcardStreak?.current || 0;

  // 2. Count total cards
  const totalCards = await Flashcard.countDocuments({});

  // 3. Count mastered cards
  const masteredCount = await FlashcardProgress.countDocuments({
    userId: userObjId,
    lastRating: 'correct'
  });

  // 4. Count due today cards (unseen + overdue cards)
  const allCards = await Flashcard.find({}).select('_id');
  const cardIds = allCards.map(c => c._id);

  const progresses = await FlashcardProgress.find({
    userId: userObjId,
    cardId: { $in: cardIds }
  });

  const dueProgressesCount = progresses.filter(p => p.nextReviewDate <= new Date()).length;
  const seenCardIds = progresses.map(p => p.cardId.toString());
  const unseenCount = allCards.filter(c => !seenCardIds.includes(c._id.toString())).length;

  const dueTodayCount = dueProgressesCount + unseenCount;

  // 5. Historic aggregate metrics (backward compatibility)
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

  const averageAccuracy = overallStats.length ? Math.round(overallStats[0].averageSessionScore) : 0;
  const decksCompleted = overallStats.length ? overallStats[0].decksCompleted.length : 0;
  const totalSessions = overallStats.length ? overallStats[0].totalSessions : 0;

  return {
    totalCards,
    masteredCount,
    dueTodayCount,
    streak,
    totalCardsStudied: progresses.length,
    averageAccuracy,
    decksCompleted,
    totalSessions
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
