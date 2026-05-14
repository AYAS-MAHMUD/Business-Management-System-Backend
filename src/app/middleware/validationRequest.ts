import { ZodError, ZodTypeAny } from 'zod';
import { Request, Response, NextFunction } from 'express';

const validateRequest = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        let parsedBody = req.body;

        if (req.body.data) {
          parsedBody = JSON.parse(req.body.data);
        }

        await schema.parseAsync({
          body: parsedBody,
          params: req.params,
          query: req.query,
        });


      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        return res.status(400).json({
          success: false,
          message: 'Validation Error',
          errors,
        });
      }

      next(error);
    }
  };
  
};
export default validateRequest;
