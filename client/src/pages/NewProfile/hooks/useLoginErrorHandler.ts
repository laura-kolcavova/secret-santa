import { AxiosError } from 'axios';
import { useLocalization } from '~/translation/useLocalization';

import { sharedMessages } from '~/pages/shared/sharedMessages';
import { messages } from '../messages';

export const useLoginErrorHandler = () => {
  const { formatMessage } = useLocalization();

  const handleError = (error: unknown): string => {
    if (error instanceof AxiosError && error.response?.data.code) {
      const code = error.response.data.code;

      switch (code) {
        case 'User.EmailAlreadyExists':
          return formatMessage(messages.emailAlreadyExists);
      }
    }

    return formatMessage(sharedMessages.somethingWentWrong);
  };

  return { handleError };
};
