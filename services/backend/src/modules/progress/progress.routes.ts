import { Router } from 'express';
import progressController from './progress.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { checkRole } from '../../middleware/rbac.middleware.js';

const router = Router();

router.use(requireAuth);

// POST /api/progress/enroll - Enroll (User self, or Admin for others)
router.post('/enroll', progressController.enrollUser);

// PATCH /api/progress/:id - Update Grade/Status (Admin+)
router.patch('/:id', checkRole(['admin', 'super-admin']), progressController.updateProgress);

// DELETE /api/progress/:id - Wipe History (Super Admin only)
router.delete('/:id', checkRole(['super-admin']), progressController.deleteProgress);

export default router;
