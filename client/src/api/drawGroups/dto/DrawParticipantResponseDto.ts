export type DrawParticipantResponseDto = {
  drawnParticipant: DrawnParticipantDto;
};

export type DrawnParticipantDto = {
  email: string;
  fullName: string;
  department: string;
  hobbies: string[];
};
