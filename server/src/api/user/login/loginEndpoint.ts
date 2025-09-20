import { Request, Response, NextFunction } from 'express';
import { identityService } from '~/application/user/services/identityService';
import { LoginRequestDto } from './LoginRequestDto';
import { asProblemDetails } from '~/api/utils/validationErrorHelper';

export const LOGIN_PATH = '/login';

export const handleLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginRequest = req.body as LoginRequestDto;

    const loginResult = identityService.login(loginRequest.email, loginRequest.pin);

    if (!loginResult.isSuccess) {
      const problemDetails = asProblemDetails(loginResult.error!, req);

      res.status(400).json(problemDetails);

      next();

      return;
    }

    res.status(204).send();

    next();
  } catch (error) {
    next(error);
  }
};
