import { DrawnByParticipant } from './DrawnByParticipant';
import { DrawnParticipant } from './DrawnParticipant';

export type DrawGroupParticipant = {
  email: string;
  hasDrawn: boolean;
  isDrawn: boolean;
  drawnParticipant?: DrawnParticipant;
  drawnByParticipant?: DrawnByParticipant;
};
