import { UnitResult, unitResultError, unitResultSuccess } from '../../shared/models/UnitResult';
import { userErrors } from '../userErrors';
import { userManager } from './userManager';

const editProfile = (
  email: string,
  firstName: string,
  lastName: string,
  department: string,
  hobbies: string[],
): UnitResult => {
  const user = userManager.findByEmail(email);

  if (!user) {
    return unitResultError(userErrors.notFound());
  }

  userManager.changeProfile(user, firstName, lastName, department, hobbies);

  return unitResultSuccess();
};

export const editProfileService = {
  editProfile,
};
