import { IdentityUser } from '~/models/IdentityUser';

export const mockIdentityUsers: IdentityUser[] = [
  {
    email: 'user.1111@mock.com',
    firstName: 'First Name MOCK',
    lastName: 'Last Name MOCK',
    department: 'Department MOCK',
    hobbies: ['Hobby 1 MOCK', 'Hobby 2 MOCK'],
    pinHash: 'b59c67bf196a4758191e42f76670ceba',
  },
];
