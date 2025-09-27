import { DrawGroup } from './models/DrawGroup';

export const mockDraws: DrawGroup[] = [
  {
    year: 2025,
    name: 'Christmas 2025',
    drawStartUtc: new Date(Date.UTC(2025, 9, 31, 23, 0, 0)),
    drawEndUtc: new Date(Date.UTC(2025, 11, 31, 23, 0, 0)),
    participants: [],
  },
];
