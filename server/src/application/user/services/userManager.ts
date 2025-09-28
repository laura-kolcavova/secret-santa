import { normalizeEmail } from '~/application/shared/emailHelper';
import { computePinHash } from '~/application/shared/pinHelper';
import { User } from '../models/User';
import { mockUsers } from '../../../persistence/users/mockUsers';

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
    createdAtUtc: new Date(Date.now()),
  };

  mockUsers.push(user);

  return user;
};

const updateProfile = (
  userToUpdate: User,
  firstName: string,
  lastName: string,
  department: string,
  hobbies: string[],
): void => {
  userToUpdate.firstName = firstName;
  userToUpdate.lastName = lastName;
  userToUpdate.department = department;
  userToUpdate.hobbies = [...hobbies];

  mockUsers.forEach((persistedUser) => {
    if (persistedUser.email !== userToUpdate.email) {
      return;
    }

    persistedUser.firstName = firstName;
    persistedUser.lastName = lastName;
    persistedUser.department = department;
    persistedUser.hobbies = [...hobbies];
  });
};

const updatePinHash = (userToUpdate: User, pinHash: string): void => {
  userToUpdate.pinHash = pinHash;

  mockUsers.forEach((persistedUser) => {
    if (persistedUser.email !== userToUpdate.email) {
      return;
    }

    persistedUser.pinHash = pinHash;
  });
};

export const userManager = {
  checkPin,
  findByEmail,
  createUser,
  updateProfile,
  updatePinHash,
};
