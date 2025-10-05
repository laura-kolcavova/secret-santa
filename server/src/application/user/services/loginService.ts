import { LoginResult, loginResultError, loginResultSuccess } from '../models/LoginResult';
import { userErrors } from '../userErrors';
import { userManager } from './userManager';

const login = (email: string, pin: string, abortSignal: AbortSignal): LoginResult => {
  const user = userManager.findByEmail(email, abortSignal);

  if (!user) {
    return loginResultError(userErrors.notFound());
  }

  const userHasValidPin = userManager.checkPin(user, pin);

  if (!userHasValidPin) {
    return loginResultError(userErrors.pinDoesNotMatch());
  }

  return loginResultSuccess(user);
};

export const loginService = {
  login,
};
