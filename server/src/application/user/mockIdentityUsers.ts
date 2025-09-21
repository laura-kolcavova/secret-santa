import { IdentityUser } from '~/application/user/models/IdentityUser';

export const mockIdentityUsers: IdentityUser[] = [
  {
    email: 'user.1111@mock.com',
    firstName: 'First Name MOCK',
    lastName: 'Last Name MOCK',
    department: 'Department MOCK',
    hobbies: ['Hobby 1 MOCK', 'Hobby 2 MOCK'],
    pinHash: 'df76742566d102582564aed2bb4543ef',
    createdAt: new Date(Date.now()),
  },
];
