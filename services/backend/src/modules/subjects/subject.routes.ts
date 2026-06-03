import { Router } from 'express';
import subjectController from './subject.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import { requireAuth, optionalAuth } from '../../middleware/auth.middleware.js';
import { checkRole } from '../../middleware/rbac.middleware.js';
import {
  createSubjectSchema,
  updateSubjectSchema,
  subjectIdParamsSchema,
} from './subject.validation.js';

const router = Router();

// GET /api/subjects - Get all subjects (optional auth for user-specific progress)
router.get('/', optionalAuth, subjectController.getAll);

// GET /api/subjects/:id - Get a single subject details
router.get(
  '/:id',
  optionalAuth,
  validate(subjectIdParamsSchema),
  subjectController.getOne
);

// GET /api/subjects/:id/curriculum - Get curriculum with sequential locking (authed only)
router.get(
  '/:id/curriculum',
  requireAuth,
  validate(subjectIdParamsSchema),
  subjectController.getCurriculum
);

// GET /api/subjects/:id/continue - Get next resume lesson details (authed only)
router.get(
  '/:id/continue',
  requireAuth,
  validate(subjectIdParamsSchema),
  subjectController.getContinue
);

// POST /api/subjects - Create a new subject (Admin only)
router.post(
  '/',
  requireAuth,
  checkRole(['admin']),
  validate(createSubjectSchema),
  subjectController.create
);

// PATCH /api/subjects/:id - Update a subject (Admin only)
router.patch(
  '/:id',
  requireAuth,
  checkRole(['admin']),
  validate(updateSubjectSchema),
  subjectController.update
);

// DELETE /api/subjects/:id - Delete a subject (Admin only)
router.delete(
  '/:id',
  requireAuth,
  checkRole(['admin']),
  validate(subjectIdParamsSchema),
  subjectController.remove
);

export default router;
