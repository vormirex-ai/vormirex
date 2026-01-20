import { Router } from 'express';
import analyticsController from './analytics.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { checkRole } from '../../middleware/rbac.middleware.js';

const router = Router();

// GET /api/analytics/stats - Get admin stats (Admin only)
router.get(
  '/stats',
  requireAuth,
  checkRole(['super-admin']),
  analyticsController.getStats
);

export default router;
