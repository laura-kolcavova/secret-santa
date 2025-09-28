import { User } from '~/application/user/models/User';

export const mockUsers: User[] = [
  {
    email: 'user@fake.com',
    firstName: 'FAKEDATA',
    lastName: 'FAKEDATA',
    department: 'A',
    hobbies: ['FAKEDATA 1', 'FAKEDATA 2', 'FAKEDATA 3'],
    pinHash: 'df76742566d102582564aed2bb4543ef', // 1111
    createdAtUtc: new Date(Date.now()),
  },
];
