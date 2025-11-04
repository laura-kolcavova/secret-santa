import { getFullName, User } from './User';

export type UserTokenPayload = {
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  roles: string[];
};

export const createUserTokenPayload = (user: User): UserTokenPayload => {
  return {
    email: user.email,
    fullName: getFullName(user),
    firstName: user.firstName,
    lastName: user.lastName,
    roles: [...user.roles],
  };
};

export const hasRole = (userTokenPayload: UserTokenPayload, role: string) => {
  return userTokenPayload.roles.includes(role);
};
