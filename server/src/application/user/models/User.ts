import { UserTokenPayload } from './UserTokenPayload';

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  hobbies: string[];
  roles: string[];
  pinHash: string;
  createdAtUtc: Date;
};

export const getFullName = (user: User) => {
  return `${user.firstName} ${user.lastName}`;
};

export const hasRole = (user: User, role: string) => {
  return user.roles.includes(role);
};

export const assignRole = (user: User, role: string) => {
  if (hasRole(user, role)) {
    return;
  }

  user.roles.push(role);
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
