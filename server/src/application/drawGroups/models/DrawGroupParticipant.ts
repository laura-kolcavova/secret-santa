import { DrawnParticipant } from './DrawnParticipant';

export type DrawGroupParticipant = {
  email: string;
  hasDrawn: boolean;
  drawnParticipant?: DrawnParticipant;
};
