import { Request, Response } from 'express';
import flashcardService from './flashcard.service.js';

export const getDecks = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const { subjectId } = req.query;
    
    const decks = await flashcardService.getDecks(userId, subjectId as string);
    res.status(200).json(decks);
  } catch (error) {
    console.error('Error fetching decks:', error);
    res.status(500).json({ error: 'Server error fetching decks' });
  }
};

export const getDeckCards = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const { deckId } = req.params;
    
    const cards = await flashcardService.getDeckCards(userId, deckId);
    res.status(200).json(cards);
  } catch (error) {
    console.error('Error fetching deck cards:', error);
    res.status(500).json({ error: 'Server error fetching cards' });
  }
};

export const getDueCards = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const { deckId } = req.params;
    
    const dueCards = await flashcardService.getDueCards(userId, deckId);
    res.status(200).json(dueCards);
  } catch (error) {
    console.error('Error fetching due cards:', error);
    res.status(500).json({ error: 'Server error fetching due cards' });
  }
};

export const submitProgress = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const { cardId, deckId, rating, userAnswer } = req.body;
    
    if (!cardId || !deckId || !rating) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const progress = await flashcardService.submitProgress(userId, cardId, deckId, rating, userAnswer);
    res.status(200).json(progress);
  } catch (error) {
    console.error('Error submitting progress:', error);
    res.status(500).json({ error: 'Server error submitting progress' });
  }
};

export const completeSession = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const { deckId, results } = req.body;
    
    if (!deckId || !Array.isArray(results)) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const sessionData = await flashcardService.completeSession(userId, deckId, results);
    res.status(200).json(sessionData);
  } catch (error) {
    console.error('Error completing session:', error);
    res.status(500).json({ error: 'Server error completing session' });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    
    const stats = await flashcardService.getStats(userId);
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Server error fetching stats' });
  }
};

export default {
  getDecks,
  getDeckCards,
  getDueCards,
  submitProgress,
  completeSession,
  getStats
};
