import { Request, Response, NextFunction } from 'express';
import aiTutorService from './aiTutor.service.js';

class AITutorController {
  async getHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as any;
      if (!user) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const chat = await aiTutorService.getChatHistory(
        user.userId,
        req.params.lessonId
      );

      res.status(200).json({
        success: true,
        data: chat,
      });
    } catch (error) {
      next(error);
    }
  }

  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as any;
      if (!user) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const { message, actionType } = req.body;
      const chat = await aiTutorService.sendMessage(
        user.userId,
        req.params.lessonId,
        message,
        actionType
      );

      res.status(200).json({
        success: true,
        data: chat,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AITutorController();
