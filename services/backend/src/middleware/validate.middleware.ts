import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';

export const validate =
  (schema: ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (parsed.body !== undefined) req.body = parsed.body;
      if (parsed.query !== undefined) req.query = parsed.query;
      if (parsed.params !== undefined) req.params = parsed.params;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues.map((issue) => issue.message).join(', ');
        return res.status(400).json({
          success: false,
          message,
          errors: error.issues,
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };
