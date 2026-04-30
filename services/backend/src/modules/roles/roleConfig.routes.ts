import { Router } from 'express';
import roleConfigController from './roleConfig.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { checkRole } from '../../middleware/rbac.middleware.js';

const router = Router();

// Only Super Admins can manage the RBAC system globally
router.use(requireAuth);
router.use(checkRole(['super-admin']));

// GET /api/roles?roleName=admin
router.get('/', roleConfigController.getRoleConfig);

// PUT /api/roles
router.put('/', roleConfigController.updateRoleConfig);

export default router;
