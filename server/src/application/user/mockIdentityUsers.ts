import { IdentityUser } from '~/application/user/models/IdentityUser';

export const mockIdentityUsers: IdentityUser[] = [
  {
    email: 'user@fake.com',
    firstName: 'FAKEDATA',
    lastName: 'FAKEDATA',
    department: 'A',
    hobbies: ['FAKEDATA 1', 'FAKEDATA 2', 'FAKEDATA 3'],
    pinHash: 'df76742566d102582564aed2bb4543ef', // 1111
    createdAt: new Date(Date.now()),
  },
];
