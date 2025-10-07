import { NextFunction, Request, Response } from 'express';

export const abortSignalHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const abortController = new AbortController();
    const { signal } = abortController;

    res.on('close', () => {
      abortController.abort();
    });

    req.abortSignal = signal;

    next();
  } catch (error) {
    next(error);
  }
};
