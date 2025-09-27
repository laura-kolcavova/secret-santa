import { normalizeEmail } from '~/application/shared/emailHelper';
import { computePinHash } from '~/application/shared/pinHelper';
import { User } from '../models/User';
import { mockUsers } from '../mockUsers';

const checkPin = (user: User, pin: string): boolean => {
  const pinHash = computePinHash(pin);

  return user.pinHash === pinHash;
};

const findByEmail = (email: string): User | undefined => {
  const normalizedEmail = normalizeEmail(email);

  const user = mockUsers.find((user) => user.email === normalizedEmail);

  if (user === undefined) {
    return undefined;
  }

  return { ...user };
};

const createUser = (
  email: string,
  pin: string,
  firstName: string,
  lastName: string,
  department: string,
  hobbies: string[],
): User => {
  const normalizedEmail = normalizeEmail(email);

  const pinHash = computePinHash(pin);

  const user: User = {
    email: normalizedEmail,
    pinHash,
    firstName,
    lastName,
    department,
    hobbies: [...hobbies],
    createdAt: new Date(Date.now()),
  };

  mockUsers.push(user);

  return user;
};

const updateProfile = (userToUpdate: User): void => {
  mockUsers.forEach((user) => {
    if (user.email !== userToUpdate.email) {
      return;
    }

    user.firstName = userToUpdate.firstName;
    user.lastName = userToUpdate.lastName;
    user.department = userToUpdate.department;
    user.hobbies = [...userToUpdate.hobbies];
  });
};

const updatePin = (userToUpdate: User): void => {
  mockUsers.forEach((user) => {
    if (user.email !== userToUpdate.email) {
      return;
    }

    user.pinHash = userToUpdate.pinHash;
  });
};
export const userManager = {
  checkPin,
  findByEmail,
  createUser,
  updateProfile,
  updatePin,
};
