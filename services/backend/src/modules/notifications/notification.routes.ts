import { Router } from 'express';
import notificationController from './notification.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = Router();

// Protect all routes
router.use(requireAuth);

router.get('/', notificationController.getNotifications);
router.get('/stream', notificationController.streamNotifications);
router.get('/stats', notificationController.getNotificationStats);
router.delete('/clear', notificationController.clearHistory);
router.get('/export', notificationController.exportActivity);
router.patch('/read-all', notificationController.markAllAsRead);
router.patch('/:id/read', notificationController.markAsRead);

export default router;
