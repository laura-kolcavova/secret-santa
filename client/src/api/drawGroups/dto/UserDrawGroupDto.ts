export type UserDrawGroupDto = {
  name: string;
  participantsCount: number;
  drawStartUtc: string;
  drawEndUtc: string;
  didUserJoined: boolean;
  drawnUser?: DrawnUserDto;
};

export type DrawnUserDto = {
  email: string;
  fullName: string;
  department: string;
  hobbies: string[];
};
