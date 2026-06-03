import { Router } from 'express';
import aiTutorController from './aiTutor.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import {
  lessonIdParamsSchema,
  aiTutorMessageSchema,
} from './aiTutor.validation.js';

const router = Router();

// GET /api/ai-tutor/chats/:lessonId - Retrieve chat history for this user and lesson
router.get(
  '/chats/:lessonId',
  requireAuth,
  validate(lessonIdParamsSchema),
  aiTutorController.getHistory
);

// POST /api/ai-tutor/chats/:lessonId/message - Send prompt/action and retrieve AI Tutor response
router.post(
  '/chats/:lessonId/message',
  requireAuth,
  validate(aiTutorMessageSchema),
  aiTutorController.sendMessage
);

export default router;
