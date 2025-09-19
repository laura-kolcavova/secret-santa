import { LoginResult, loginResultError, loginResultSuccess } from '../models/LoginResult';
import {
  RegisterResult,
  registerResultError,
  registerResultSuccess,
} from '../models/RegisterResult';
import { userErrors } from '../userErrors';
import { userManager } from './userManager';

const login = (email: string, pin: string): LoginResult => {
  const user = userManager.findByEmail(email);

  if (!user) {
    return loginResultError(userErrors.notFound());
  }

  const userHasValidPin = userManager.checkPin(user, pin);

  if (!userHasValidPin) {
    return loginResultError(userErrors.pinDoNotMatch());
  }

  return loginResultSuccess();
};

const register = (
  email: string,
  pin: string,
  firstName: string,
  lastName: string,
  department: string,
  hobbies: string[],
): RegisterResult => {
  const user = userManager.findByEmail(email);

  if (user) {
    return registerResultError(userErrors.emailAlreadyExists());
  }

  userManager.createUser(email, pin, firstName, lastName, department, hobbies);

  return registerResultSuccess();
};

export const identityService = {
  login,
  register,
};
