import { DrawGroupParticipant } from './DrawGroupParticipant';

export type DrawGroup = {
  guid: string;
  year: number;
  name: string;
  drawStartUtc: Date;
  drawEndUtc: Date;
  participants: DrawGroupParticipant[];
  createdAtUtc: Date;
};
