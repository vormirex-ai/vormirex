import { Router } from 'express';
import userController from './user.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { checkRole } from '../../middleware/rbac.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { upload } from '../../middleware/upload.middleware.js';
import { updateProfileSchema, changePasswordSchema, updatePreferencesSchema, updateNotificationPreferencesSchema, updatePrivacySettingsSchema } from './user.validation.js';

const router = Router();

// middleware to protect all user routes
router.use(requireAuth);

// --- User Settings Routes (Accessible by all authenticated users) ---
router.patch('/me/profile', validate(updateProfileSchema), userController.updateProfile);
router.post('/me/profile-photo', upload.single('photo'), userController.uploadProfilePhoto);
router.delete('/me/profile-photo', userController.removeProfilePhoto);
router.patch('/me/password', validate(changePasswordSchema), userController.changePassword);
router.patch('/me/preferences', validate(updatePreferencesSchema), userController.updatePreferences);
router.patch('/me/notifications', validate(updateNotificationPreferencesSchema), userController.updateNotificationPreferences);
router.patch('/me/privacy', validate(updatePrivacySettingsSchema), userController.updatePrivacySettings);
router.delete('/me', userController.deleteAccount);

// --- Public Profile Route (Respects Privacy) ---
router.get('/:id/profile', userController.getPublicProfile);

// --- Admin Routes ---
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
