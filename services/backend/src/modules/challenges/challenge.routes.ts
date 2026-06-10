import { Router } from 'express';
import challengeController from './challenge.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = Router();

// Protect all daily challenge routes
router.use(requireAuth);

// 1. Fetch Today's Seeded Daily Challenge
router.get('/today', challengeController.getTodayChallenge);

// 2. Submit Daily Challenge Answers & Gamification
router.post('/submit', challengeController.submitChallenge);

// 3. Verify Single Question Answer
router.post('/questions/:questionId/verify', challengeController.verifyQuestionAnswer);

// 4. Get Challenge History (Paginated)
router.get('/history', challengeController.getChallengeHistory);

// 5. Get Challenge Streak & Stats
router.get('/streak', challengeController.getChallengeStreakAndStats);

// 6. Get Calendar View (Heatmap data)
router.get('/calendar/:month', challengeController.getChallengeCalendar);

export default router;
