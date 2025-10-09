export type User = {
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  hobbies: string[];
  pinHash: string;
  createdAtUtc: Date;
};

export const getFullName = (user: User) => {
  return `${user.firstName} ${user.lastName}`;
};
