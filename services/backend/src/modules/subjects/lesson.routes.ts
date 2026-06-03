import { Router } from 'express';
import lessonController from './lesson.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import { requireAuth, optionalAuth } from '../../middleware/auth.middleware.js';
import {
  lessonIdParamsSchema,
  lessonProgressSchema,
} from './lesson.validation.js';

const router = Router();

// GET /api/lessons/:id - Get lesson details, video stream URL, and transcript
router.get(
  '/:id',
  optionalAuth,
  validate(lessonIdParamsSchema),
  lessonController.getOne
);

// POST /api/lessons/:id/progress - Report video playback progress (seconds watched)
router.post(
  '/:id/progress',
  requireAuth,
  validate(lessonProgressSchema),
  lessonController.updateProgress
);

// POST /api/lessons/:id/complete - Mark lesson as completed and trigger unlocking next lesson
router.post(
  '/:id/complete',
  requireAuth,
  validate(lessonIdParamsSchema),
  lessonController.complete
);

export default router;
