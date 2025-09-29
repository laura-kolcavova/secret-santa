import { AxiosError } from 'axios';
import { sharedMessages } from '~/pages/shared/sharedMessages';
import { MessageDescriptor } from '~/translation/MessageDescriptor';
import { messages } from '../messages';

export const useDrawParticipantErrorHandler = () => {
  const handleError = (error: unknown): MessageDescriptor => {
    if (error instanceof AxiosError && error.response?.data.code) {
      const code = error.response.data.code;

      switch (code) {
        case 'DrawGroup.NoParticipantsToDraw':
          return messages.noParticipantsToDraw;
      }
    }

    return sharedMessages.somethingWentWrong;
  };

  return { handleError };
};
