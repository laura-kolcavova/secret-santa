import { LoginResult, loginResultError, loginResultSuccess } from '../models/LoginResult';
import {
  RegisterResult,
  registerResultError,
  registerResultSuccess,
} from '../models/RegisterResult';
import { UnitResult, unitResultError, unitResultSuccess } from '../models/UnitResult';
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

const newProfile = (newProfileModel: {
  email: string;
  pin: string;
  firstName: string;
  lastName: string;
  department: string;
  hobbies: string[];
}): RegisterResult => {
  const user = userManager.findByEmail(newProfileModel.email);

  if (user) {
    return registerResultError(userErrors.emailAlreadyExists());
  }

  userManager.createUser(
    newProfileModel.email,
    newProfileModel.pin,
    newProfileModel.firstName,
    newProfileModel.lastName,
    newProfileModel.department,
    newProfileModel.hobbies,
  );

  return registerResultSuccess();
};

const editProfile = (editProfileModel: {
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  hobbies: string[];
}): UnitResult => {
  const user = userManager.findByEmail(editProfileModel.email);

  if (!user) {
    return unitResultError(userErrors.notFound());
  }

  user.firstName = editProfileModel.firstName;
  user.lastName = editProfileModel.lastName;
  user.department = editProfileModel.department;
  user.hobbies = [...editProfileModel.hobbies];

  userManager.updateUserProfile(user);

  return unitResultSuccess();
};

export const userService = {
  login,
  newProfile,
  editProfile,
};
