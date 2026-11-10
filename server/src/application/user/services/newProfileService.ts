import {
  UnitResult,
  unitResultError,
  unitResultSuccess,
} from '~/application/shared/models/UnitResult';
import { userErrors } from '../userErrors';
import { userManager } from './userManager';
import { drawGroupManager } from '~/application/drawGroups/services/drawGroupManager';

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

  // New users sometimes missed the join button, so auto-join when the choice is unambiguous
  const openDrawGroups = drawGroupManager.getAllOpenOfCurrentYear(abortSignal);

  if (openDrawGroups.length === 1) {
    drawGroupManager.joinDrawGroup(newProfileModel.email, openDrawGroups[0], abortSignal);
  }

  return unitResultSuccess();
};

export const newProfileService = {
  newProfile,
};
