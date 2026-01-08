import { Router } from 'express';
import courseController from './course.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { checkRole } from '../../middleware/rbac.middleware.js';
import {
  createCourseSchema,
  updateCourseSchema,
  courseIdParamsSchema,
} from './course.validation.js';

const router = Router();

// POST /api/courses - Create a new course (Admin only)
router.post(
  '/',
  requireAuth,
  checkRole(['admin']),
  validate(createCourseSchema),
  courseController.create
);

// GET /api/courses - Get all courses (with pagination)
router.get('/', courseController.getAll);

// GET /api/courses/:id - Get a single course details
router.get('/:id', validate(courseIdParamsSchema), courseController.getOne);

// PATCH /api/courses/:id - Update a course (Admin only)
router.patch(
  '/:id',
  requireAuth,
  checkRole(['admin']),
  validate(updateCourseSchema),
  courseController.update
);

// DELETE /api/courses/:id - Delete a course (Admin only)
router.delete(
  '/:id',
  requireAuth,
  checkRole(['admin']),
  validate(courseIdParamsSchema),
  courseController.remove
);

export default router;
