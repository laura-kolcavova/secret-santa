import { User } from '../models/User';
import { userErrors } from '../userErrors';
import { userManager } from './userManager';
import { Result, resultError, resultSuccess } from '~/application/shared/models/Result';

const editProfile = (
  email: string,
  firstName: string,
  lastName: string,
  department: string,
  hobbies: string[],
  abortSignal: AbortSignal,
): Result<User> => {
  const user = userManager.findByEmail(email, abortSignal);

  if (!user) {
    return resultError(userErrors.notFound());
  }

  userManager.changeProfile(user, firstName, lastName, department, hobbies, abortSignal);

  return resultSuccess(user);
};

export const editProfileService = {
  editProfile,
};
