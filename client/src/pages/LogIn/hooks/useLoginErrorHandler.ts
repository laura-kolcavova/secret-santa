import { AxiosError } from 'axios';
import { useLocalization } from '~/translation/useLocalization';
import { messages } from '../messages';
import { sharedMessages } from '~/pages/shared/sharedMessages';

export const useLoginErrorHandler = () => {
  const { formatMessage } = useLocalization();

  const handleError = (error: unknown): string => {
    if (error instanceof AxiosError && error.response?.data.code) {
      const code = error.response.data.code;

      switch (code) {
        case 'User.NotFound':
          return formatMessage(messages.userNotFound);
        case 'User.PinDoesNotMatch':
          return formatMessage(messages.pinDoesNotMatch);
      }
    }

    return formatMessage(sharedMessages.somethingWentWrong);
  };

  return { handleError };
};
