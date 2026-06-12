import { Router } from 'express';
import quizController from './quiz.controller.js';
import { requireAuth } from '../../middleware/auth.middleware.js';

const router = Router();

// Protect all quiz routes
router.use(requireAuth);

// 1. Submit Answers & Gamification XP Engine
router.post('/submit', quizController.submitQuiz);

// 2. Get Global Analytics
router.get('/stats', quizController.getGlobalStats);

// 3. Get User Quiz History 
router.get('/history', quizController.getQuizHistory);

// 4. Get History for Specific Subject with Trends
router.get('/history/:subjectId', quizController.getSubjectHistory);

// 5. Reveal Single Question Detail
router.get('/questions/:questionId', quizController.getQuestionDetail);

// 6. Verify Single Question Answer
router.post('/questions/:questionId/verify', quizController.verifyQuestionAnswer);

// 7. Fetch 5 random questions for a subject 
// (Placed at the bottom so the :subjectId wildcard doesn't accidentally catch the static routes above!)
router.get('/:subjectId/questions', quizController.getQuestionsForSubject);

export default router;
