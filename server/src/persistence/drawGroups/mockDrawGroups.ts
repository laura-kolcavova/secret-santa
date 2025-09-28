import { DrawGroup } from '~/application/drawGroups/models/DrawGroup';

export const mockDrawGroups: DrawGroup[] = [
  {
    guid: crypto.randomUUID(),
    year: 2025,
    name: 'Christmas 2025',
    drawStartUtc: new Date(Date.UTC(2025, 9, 32, 22, 0, 0)),
    drawEndUtc: new Date(Date.UTC(2025, 11, 31, 22, 0, 0)),
    participants: [],
    createdAtUtc: new Date(Date.now()),
  },
];
