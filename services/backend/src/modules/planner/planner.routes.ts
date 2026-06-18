import { Router } from 'express';
import plannerController from './planner.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { createPlannerTaskSchema, updatePlannerTaskSchema } from './planner.validation.js';

const router = Router();

// Protect all routes with requireAuth
router.use(requireAuth);

router.get('/', plannerController.getPlannerDashboard);
router.post('/tasks', validate(createPlannerTaskSchema), plannerController.createTask);
router.patch('/tasks/:id', validate(updatePlannerTaskSchema), plannerController.updateTask);
router.delete('/tasks/:id', plannerController.deleteTask);

export default router;
