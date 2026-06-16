import { Router } from 'express';
import focusController from './focus.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = Router();

// Protect all routes under requireAuth
router.use(requireAuth);

router.get('/', focusController.getFocusDashboard);
router.post('/tasks', focusController.createTask);
router.patch('/tasks/:id', focusController.updateTask);
router.delete('/tasks/:id', focusController.deleteTask);
router.post('/sessions', focusController.recordSession);

export default router;
