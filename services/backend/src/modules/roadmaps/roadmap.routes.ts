import { Router } from 'express';
import roadmapController from './roadmap.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = Router();

// Protect all roadmap routes (users must be logged in to generate/view roadmaps)
router.use(requireAuth);

// Generate the Roadmap
router.post('/generate', roadmapController.generateRoadmap);

// Fetch the existing Roadmap
router.get('/my-roadmap', roadmapController.getMyRoadmap);

export default router;
