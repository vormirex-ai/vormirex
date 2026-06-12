import { Router } from 'express';
import { getDashboard } from './dashboard.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = Router();

// Retrieve unified dashboard data - requires JWT authentication
router.get('/', requireAuth, getDashboard);

export default router;
