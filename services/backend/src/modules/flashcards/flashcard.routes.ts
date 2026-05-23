import { Router } from 'express';
import flashcardController from './flashcard.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = Router();

// All flashcard routes require authentication
router.use(requireAuth);

// 1. Core Deck Management
router.get('/decks', flashcardController.getDecks);
router.get('/decks/:deckId/cards', flashcardController.getDeckCards);

// 2. Spaced Repetition Engine
router.get('/decks/:deckId/due', flashcardController.getDueCards);
router.post('/progress', flashcardController.submitProgress);

// 3. Gamification & Analytics
router.post('/sessions/complete', flashcardController.completeSession);
router.get('/stats', flashcardController.getStats);

export default router;
