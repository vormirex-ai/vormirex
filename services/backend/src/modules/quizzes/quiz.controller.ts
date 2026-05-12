import { Request, Response } from 'express';
import quizService from './quiz.service.js';

export const getQuestionsForSubject = async (req: Request, res: Response) => {
  const { subjectId } = req.params;

  const questions = await quizService.generateQuizQuestions(subjectId);

  if (!questions.length) {
    return res.status(404).json({ error: 'No questions found for this subject' });
  }

  res.status(200).json({ questions });
};

export const submitQuiz = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { subjectId, answers, timeTaken } = req.body;

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty answers format' });
  }

  const { quizResult, xpEarned, newTotalXp } = await quizService.evaluateAndSubmitQuiz(userId, subjectId, answers, timeTaken);

  res.status(201).json({
    message: 'Quiz submitted successfully',
    result: quizResult,
    xpEarned,
    newTotalXp
  });
};

export const getQuestionDetail = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { questionId } = req.params;

  const question = await quizService.verifyAndGetQuestionDetail(userId, questionId);

  if (!question) {
    return res.status(403).json({ error: 'Cannot view details of unattempted questions or question not found' });
  }

  res.status(200).json({ question });
};

export const getQuizHistory = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { limit = 10, offset = 0 } = req.query;

  const history = await quizService.getUserQuizHistory(userId, Number(limit), Number(offset));

  res.status(200).json({ history });
};

export const getSubjectHistory = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { subjectId } = req.params;

  const trends = await quizService.getSubjectTrends(userId, subjectId);

  res.status(200).json(trends);
};

export const getGlobalStats = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;

  const stats = await quizService.calculateGlobalStats(userId);

  if (!stats) {
    return res.status(200).json({ message: 'No quiz data available' });
  }

  res.status(200).json(stats);
};

export default { 
  getQuestionsForSubject, 
  submitQuiz, 
  getQuestionDetail, 
  getQuizHistory, 
  getSubjectHistory, 
  getGlobalStats 
};
