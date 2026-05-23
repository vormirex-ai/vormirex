import { Request, Response } from 'express';
import challengeService from './challenge.service.js';

export const getTodayChallenge = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const result = await challengeService.getTodayChallenge(userId);
  res.status(200).json(result);
};

export const submitChallenge = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { answers, timeSpent } = req.body;

  const result = await challengeService.submitChallenge(userId, answers, timeSpent);

  res.status(201).json({
    message: 'Daily challenge submitted successfully',
    ...result,
  });
};

export const getChallengeHistory = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { limit = 10, offset = 0 } = req.query;

  const history = await challengeService.getChallengeHistory(userId, Number(limit), Number(offset));

  res.status(200).json({ history });
};

export const getChallengeStreakAndStats = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const stats = await challengeService.getChallengeStreakAndStats(userId);

  res.status(200).json(stats);
};

export const getChallengeCalendar = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;
  const { month } = req.params;

  const calendar = await challengeService.getChallengeCalendar(userId, month);

  res.status(200).json({ calendar });
};

export default {
  getTodayChallenge,
  submitChallenge,
  getChallengeHistory,
  getChallengeStreakAndStats,
  getChallengeCalendar,
};
