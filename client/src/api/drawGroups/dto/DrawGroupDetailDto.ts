export type DrawGroupDetailDto = {
  guid: string;
  name: string;
  year: number;
  drawStartUtc: string;
  drawEndUtc: string;
  participants: DrawGroupParticipantDetailDto[];
  createdAtUtc: string;
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
