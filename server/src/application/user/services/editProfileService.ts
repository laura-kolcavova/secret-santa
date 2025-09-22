import { UnitResult, unitResultError, unitResultSuccess } from '../models/UnitResult';
import { userErrors } from '../userErrors';
import { userManager } from './userManager';

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

export const editProfileService = {
  editProfile,
};
