import { Request, Response, NextFunction } from 'express';
import challengeService from './challenge.service.js';

export const getTodayChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const result = await challengeService.getTodayChallenge(userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const submitChallenge = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const { answers, timeSpent } = req.body;

    const result = await challengeService.submitChallenge(userId, answers, timeSpent);

    res.status(201).json({
      message: 'Daily challenge submitted successfully',
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const getChallengeHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const { limit = 10, offset = 0 } = req.query;

    const history = await challengeService.getChallengeHistory(userId, Number(limit), Number(offset));

    res.status(200).json({ history });
  } catch (error) {
    next(error);
  }
};

export const getChallengeStreakAndStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const stats = await challengeService.getChallengeStreakAndStats(userId);

    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

export const getChallengeCalendar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.user.userId;
    const { month } = req.params;

    const calendar = await challengeService.getChallengeCalendar(userId, month);

    res.status(200).json({ calendar });
  } catch (error) {
    next(error);
  }
};

export const verifyQuestionAnswer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { questionId } = req.params;
    const { selectedOption } = req.body;

    if (selectedOption === undefined) {
      return res.status(400).json({ error: 'selectedOption is required' });
    }

    const result = await challengeService.verifyQuestionAnswer(questionId, selectedOption);

    if (!result) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getTodayChallenge,
  verifyQuestionAnswer,
  submitChallenge,
  getChallengeHistory,
  getChallengeStreakAndStats,
  getChallengeCalendar,
};
