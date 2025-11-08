export type LoggedUserDto = {
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  roles: string[];
};

export const hasRole = (loggedUser: LoggedUserDto, role: string) => {
  return loggedUser.roles.includes(role);
};
