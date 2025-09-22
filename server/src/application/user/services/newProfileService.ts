import {
  NewProfileResult,
  registerResultError,
  registerResultSuccess,
} from '../models/NewProfileResult';
import { userErrors } from '../userErrors';
import { userManager } from './userManager';

const newProfile = (newProfileModel: {
  email: string;
  pin: string;
  firstName: string;
  lastName: string;
  department: string;
  hobbies: string[];
}): NewProfileResult => {
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

export const newProfileService = {
  newProfile,
};
