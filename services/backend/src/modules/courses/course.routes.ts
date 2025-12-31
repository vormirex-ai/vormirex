import { Router } from 'express';
import courseController from './course.controller.js';
import validate from '../../middlewares/validate.js';
import {
  createCourseSchema,
  updateCourseSchema,
  courseIdParamsSchema,
} from './course.validation.js';

const router = Router();

// POST /api/courses - Create a new course
router.post('/', validate(createCourseSchema), courseController.create);

// GET /api/courses - Get all courses (with pagination)
router.get('/', courseController.getAll);

// GET /api/courses/:id - Get a single course details
router.get('/:id', validate(courseIdParamsSchema), courseController.getOne);

// PATCH /api/courses/:id - Update a course
router.patch('/:id', validate(updateCourseSchema), courseController.update);

// DELETE /api/courses/:id - Delete a course
router.delete('/:id', validate(courseIdParamsSchema), courseController.remove);

export default router;
