import {
  UnitResult,
  unitResultError,
  unitResultSuccess,
} from '~/application/shared/models/UnitResult';
import { userErrors } from '../userErrors';
import { userManager } from './userManager';

const newProfile = (
  newProfileModel: {
    email: string;
    pin: string;
    firstName: string;
    lastName: string;
    department: string;
    hobbies: string[];
  },
  abortSignal: AbortSignal,
): UnitResult => {
  const user = userManager.findByEmail(newProfileModel.email, abortSignal);

  if (user) {
    return unitResultError(userErrors.emailAlreadyExists());
  }

  userManager.createUser(
    newProfileModel.email,
    newProfileModel.pin,
    newProfileModel.firstName,
    newProfileModel.lastName,
    newProfileModel.department,
    newProfileModel.hobbies,
    abortSignal,
  );

  return unitResultSuccess();
};

export const newProfileService = {
  newProfile,
};
