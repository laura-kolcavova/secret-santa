export type DrawGroupListDto = {
  drawGroups: DrawGroupListItemDto[];
};

export type DrawGroupListItemDto = {
  guid: string;
  name: string;
  participantsCount: number;
  drawStartUtc: string;
  drawEndUtc: string;
};
