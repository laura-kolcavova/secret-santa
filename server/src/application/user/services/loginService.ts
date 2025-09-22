import { LoginResult, loginResultError, loginResultSuccess } from '../models/LoginResult';
import { userErrors } from '../userErrors';
import { userManager } from './userManager';

const login = (email: string, pin: string): LoginResult => {
  const user = userManager.findByEmail(email);

  if (!user) {
    return loginResultError(userErrors.notFound());
  }

  const userHasValidPin = userManager.checkPin(user, pin);

  if (!userHasValidPin) {
    return loginResultError(userErrors.pinDoesNotMatch());
  }

  return loginResultSuccess();
};

export const loginService = {
  login,
};
