import { Router } from 'express';
import analyticsController from './analytics.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { checkRole } from '../../middleware/rbac.middleware.js';

const router = Router();

// 1. Lock down all analytics endpoints globally
router.use(requireAuth, checkRole(['super-admin']));

// 2. Map the 3 controller functions
router.get('/stats', analyticsController.getStats);
router.get('/user-growth', analyticsController.getUserGrowth);
router.get('/system-health', analyticsController.getSystemHealth);

export default router;
