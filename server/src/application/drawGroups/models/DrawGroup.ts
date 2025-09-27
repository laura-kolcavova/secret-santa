import { DrawParticipant } from './DrawParticipant';

export type DrawGroup = {
  year: number;
  name: string;
  drawStartUtc: Date;
  drawEndUtc: Date;
  participants: DrawParticipant[];
};
