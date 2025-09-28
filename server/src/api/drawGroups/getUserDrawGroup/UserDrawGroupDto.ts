export type UserDrawGroupDto = {
  drawGroup: DrawGroupDto;
  userStatus: UserStatusDto;
};

export type DrawGroupDto = {
  guid: string;
  name: string;
  participantsCount: number;
  drawStartUtc: string;
  drawEndUtc: string;
};

export type UserStatusDto = {
  isParticipant: boolean;
  hasDrawn: boolean;
  drawnParticipant?: DrawnParticipantDto;
};

export type DrawnParticipantDto = {
  email: string;
  fullName: string;
  department: string;
  hobbies: string[];
};
