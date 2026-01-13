import { Request, Response, NextFunction } from 'express';
import courseService from './course.service.js';

class CourseController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await courseService.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await courseService.getById(req.params.id);
      res.status(200).json({
        success: true,
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      
      // Default filter: only PUBLISHED courses
      let filter: Record<string, any> = { status: 'PUBLISHED' };

      // If user is admin, allow them to see all (remove filter)
      const user = req.user as any;
      if (user && user.role === 'admin') {
        filter = {}; // Admin sees everything
      }

      const result = await courseService.getAll(page, limit, filter);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await courseService.update(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Course updated successfully',
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await courseService.remove(req.params.id);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async publish(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await courseService.update(req.params.id, { status: 'PUBLISHED' } as any);
      res.status(200).json({
        success: true,
        message: 'Course published successfully',
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  async unpublish(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await courseService.update(req.params.id, { status: 'DRAFT' } as any);
      res.status(200).json({
        success: true,
        message: 'Course unpublished successfully',
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  async addModule(req: Request, res: Response, next: NextFunction) {
    try {
      const { levelId, title, items } = req.body;
      const course = await courseService.addModule(req.params.id, levelId, { title, items });
      res.status(200).json({
        success: true,
        message: 'Module added successfully',
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CourseController();
