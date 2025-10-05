import { UnitResult, unitResultError, unitResultSuccess } from '../../shared/models/UnitResult';
import { userErrors } from '../userErrors';
import { userManager } from './userManager';

const editProfile = (
  email: string,
  firstName: string,
  lastName: string,
  department: string,
  hobbies: string[],
  abortSignal: AbortSignal,
): UnitResult => {
  const user = userManager.findByEmail(email, abortSignal);

  if (!user) {
    return unitResultError(userErrors.notFound());
  }

  userManager.changeProfile(user, firstName, lastName, department, hobbies, abortSignal);

  return unitResultSuccess();
};

export const editProfileService = {
  editProfile,
};
