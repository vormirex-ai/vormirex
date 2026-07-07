import { Router } from 'express';
import leaderboardController from './leaderboard.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = Router();

// Protect leaderboard endpoints with auth middleware
router.use(requireAuth);

router.get('/', leaderboardController.getLeaderboard);

export default router;
