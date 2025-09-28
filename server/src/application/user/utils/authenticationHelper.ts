import { User } from '../models/User';
import { UserTokenPayload } from '../models/UserTokenPayload';
import { getFullName } from './userHelpers';

export const createUserTokenPayload = (user: User): UserTokenPayload => {
  return {
    email: user.email,
    fullName: getFullName(user),
    firstName: user.firstName,
    lastName: user.lastName,
  };
};
