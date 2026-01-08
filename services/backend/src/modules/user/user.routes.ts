import { Router } from 'express';
import userController from './user.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { checkRole } from '../../middleware/rbac.middleware.js';

const router = Router();

// middleware to protect all user routes
router.use(requireAuth);
router.use(checkRole(['admin']));

// GET /api/users - Get all users
router.get('/', userController.getAllUsers);

// PATCH /api/users/:id/role - Update user role
router.patch('/:id/role', userController.updateUserRole);

export default router;
