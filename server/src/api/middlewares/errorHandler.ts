import { NextFunction, Request, Response } from 'express';
import { ApiError } from './ApiError';

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(err.status ?? 500).json({
    message: err.message || 'Internal Server Error',
  });
};
