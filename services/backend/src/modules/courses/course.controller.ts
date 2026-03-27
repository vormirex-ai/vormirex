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
      
      const user = req.user as any;
      const isAdmin = user && user.role === 'admin';

      if (course.isHidden && !isAdmin) {
        // Option 1: Return 404 to pretend it doesn't exist
        // Option 2: Return 403 Forbidden
        // Going with 404 to match typical "hidden" behavior
        res.status(404).json({ message: 'Course not found' });
        return;
      }

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
      let filter: Record<string, any> = { status: 'PUBLISHED', isHidden: { $ne: true } };

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

  async toggleVisibility(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await courseService.getById(req.params.id);
      const updatedCourse = await courseService.update(req.params.id, { isHidden: !course.isHidden } as any);
      
      res.status(200).json({
        success: true,
        message: `Course is now ${updatedCourse.isHidden ? 'hidden' : 'visible'}`,
        data: updatedCourse,
      });
    } catch (error) {
      next(error);
    }
  }
  async uploadMedia(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, field } = req.params;
      
      const allowedFields = ['thumbnail', 'heroVideo', 'careerImage', 'gainImage', 'coursePdf'];
      if (!allowedFields.includes(field)) {
        res.status(400).json({ message: 'Invalid media field' });
        return;
      }

      if (!req.file) {
        res.status(400).json({ message: 'No file provided' });
        return;
      }

      const course = await courseService.getById(id);
      
      const updateData: any = {};
      updateData[field] = req.file.path;

      const updatedCourse = await courseService.update(id, updateData);

      res.status(200).json({
        success: true,
        message: `${field} uploaded successfully`,
        data: updatedCourse,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CourseController();
