export type UserTokenPayload = {
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  roles: string[];
};

export const hasRole = (userTokenPayload: UserTokenPayload, role: string) => {
  return userTokenPayload.roles.includes(role);
};
