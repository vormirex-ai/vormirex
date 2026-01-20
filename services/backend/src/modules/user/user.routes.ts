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

// GET /api/users/admins - Get all other admins
router.get('/admins', userController.getAdmins);

// PATCH /api/users/:id/role - Update user role
router.patch('/:id/role', checkRole(['super-admin']), userController.updateUserRole);

// DELETE /api/users/:id - Delete user (admin only)
router.delete('/:id', checkRole(['super-admin']), userController.deleteUser);

// PATCH /api/users/:id/status - Toggle freeze/active (Super Admin only)
router.patch('/:id/status', checkRole(['super-admin']), userController.toggleUserStatus);

export default router;
