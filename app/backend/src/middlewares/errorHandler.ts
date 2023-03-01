import { Request, Response, NextFunction } from 'express';

function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  console.error(err.stack);

  res.status(500).json({ error: err.message });
}

export default function errorMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    next();
  } catch (err) {
    const error = err as Error;
    errorHandler(error, req, res, next);
  }
}
