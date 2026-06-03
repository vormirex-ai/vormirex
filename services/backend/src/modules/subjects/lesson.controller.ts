import { Request, Response, NextFunction } from 'express';
import lessonService from './lesson.service.js';

class LessonController {
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const lesson = await lessonService.getById(req.params.id);
      res.status(200).json({
        success: true,
        data: lesson,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as any;
      if (!user) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const { secondsWatched, durationWatchedIncrement } = req.body;
      const progress = await lessonService.updateProgress(
        user.userId,
        req.params.id,
        secondsWatched,
        durationWatchedIncrement
      );

      res.status(200).json({
        success: true,
        message: 'Progress updated successfully',
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  }

  async complete(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as any;
      if (!user) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const result = await lessonService.completeLesson(
        user.userId,
        req.params.id
      );

      res.status(200).json({
        success: true,
        message: 'Lesson marked as completed successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new LessonController();
