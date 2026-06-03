import { Request, Response, NextFunction } from 'express';
import subjectService from './subject.service.js';

class SubjectController {
  async create(req: Request, res: Response, next: NextFunction) {
    /* #swagger.requestBody = {
         required: true,
         content: {
           "application/json": {
             schema: {
               type: "object",
               properties: {
                 title: { type: "string", example: "Introduction to JavaScript" },
                 subtitle: { type: "string", example: "Learn the fundamentals of JS programming" },
                 description: { type: "string", example: "This subject covers core JavaScript concepts, variables, loops, objects, functions, and standard libraries." },
                 icon: { type: "string", example: "code" },
                 price: { type: "number", example: 0 },
                 isPro: { type: "boolean", example: false },
                 hasCertificate: { type: "boolean", example: false },
                 status: { type: "string", example: "DRAFT" },
                 tags: { type: "array", items: { type: "string" }, example: ["javascript", "web-dev"] }
               },
               required: ["title", "description", "icon"]
             }
           }
         }
       } */
    try {
      const subject = await subjectService.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Subject created successfully',
        data: subject,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const subject = await subjectService.getById(req.params.id);

      const user = req.user as any;
      const isAdmin = user && user.role === 'admin';

      if (subject.status === 'DRAFT' && !isAdmin) {
        res.status(404).json({ message: 'Subject not found' });
        return;
      }

      res.status(200).json({
        success: true,
        data: subject,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      // Default filter: only PUBLISHED subjects
      let filter: Record<string, any> = { status: 'PUBLISHED' };

      // If user is admin, allow them to see all (remove filter)
      const user = req.user as any;
      const isAdmin = user && user.role === 'admin';
      if (isAdmin) {
        filter = {}; // Admin sees everything
      }

      const result = await subjectService.getAll(
        page,
        limit,
        filter,
        user ? user.userId : undefined
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    /* #swagger.requestBody = {
         required: true,
         content: {
           "application/json": {
             schema: {
               type: "object",
               properties: {
                 title: { type: "string", example: "Advanced JavaScript" },
                 subtitle: { type: "string", example: "Deep dive into JS concepts" },
                 description: { type: "string", example: "Learn closures, scopes, prototypical inheritance, and event loop." },
                 icon: { type: "string", example: "code-braces" },
                 price: { type: "number", example: 299 },
                 isPro: { type: "boolean", example: true },
                 hasCertificate: { type: "boolean", example: true },
                 status: { type: "string", example: "PUBLISHED" },
                 tags: { type: "array", items: { type: "string" }, example: ["javascript", "advanced"] }
               }
             }
           }
         }
       } */
    try {
      const subject = await subjectService.update(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Subject updated successfully',
        data: subject,
      });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await subjectService.remove(req.params.id);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCurriculum(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as any;
      if (!user) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const result = await subjectService.getCurriculum(
        req.params.id,
        user.userId
      );
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getContinue(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as any;
      if (!user) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const result = await subjectService.getContinueLesson(
        req.params.id,
        user.userId
      );
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new SubjectController();
