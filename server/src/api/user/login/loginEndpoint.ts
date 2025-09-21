import { Request, Response, NextFunction, Router } from 'express';
import { userService } from '~/application/user/services/userService';
import { LoginRequestDto } from './LoginRequestDto';
import { asProblemDetails } from '~/api/utils/validationErrorHelper';

export const mapLogin = (router: Router) => {
  router.post('/login', handleLogin);
};

const handleLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginRequest = req.body as LoginRequestDto;

    const loginResult = userService.login(loginRequest.email, loginRequest.pin);

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
