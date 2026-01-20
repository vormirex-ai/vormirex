import { Router } from 'express';
import courseController from './course.controller.js';
import { validate } from '../../middleware/validate.middleware.js';
import { requireAuth, optionalAuth } from '../../middleware/auth.middleware.js';
import { checkRole } from '../../middleware/rbac.middleware.js';
import {
  createCourseSchema,
  updateCourseSchema,
  courseIdParamsSchema,
  addModuleSchema,
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
router.get('/', optionalAuth, courseController.getAll);

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

// POST /api/courses/:id/publish - Publish a course (Admin only)
router.post(
  '/:id/publish',
  requireAuth,
  checkRole(['admin']),
  validate(courseIdParamsSchema),
  courseController.publish
);

// POST /api/courses/:id/unpublish - Unpublish a course (Admin only)
router.post(
  '/:id/unpublish',
  requireAuth,
  checkRole(['admin']),
  validate(courseIdParamsSchema),
  courseController.unpublish
);

// PATCH /api/courses/:id/visibility - Toggle course visibility (Admin only)
router.patch(
  '/:id/visibility',
  requireAuth,
  checkRole(['admin']),
  validate(courseIdParamsSchema),
  courseController.toggleVisibility
);

// POST /api/courses/:id/modules - Add a module to a course level (Admin only)
router.post(
  '/:id/modules',
  requireAuth,
  checkRole(['admin']),
  validate(addModuleSchema),
  courseController.addModule
);

export default router;
