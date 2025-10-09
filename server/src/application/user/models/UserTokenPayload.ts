import { getFullName, User } from './User';

export type UserTokenPayload = {
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
};

export const createUserTokenPayload = (user: User): UserTokenPayload => {
  return {
    email: user.email,
    fullName: getFullName(user),
    firstName: user.firstName,
    lastName: user.lastName,
  };
};
