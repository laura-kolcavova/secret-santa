export type DrawGroupDetailDto = {
  guid: string;
  name: string;
  year: number;
  drawStartUtc: string;
  drawEndUtc: string;
  participants: DrawGroupParticipantDetailDto[];
  nonParticipants: DrawGroupNonParticipantDetailDto[];
  createdAtUtc: string;
};

export type DrawGroupNonParticipantDetailDto = {
  email: string;
  fullName: string;
};

export type DrawGroupParticipantDetailDto = {
  email: string;
  fullName: string;
  hasDrawn: boolean;
  drawnParticipant?: DrawnParticipanDetaiLDto;
};

export type DrawnParticipanDetaiLDto = {
  email: string;
};
