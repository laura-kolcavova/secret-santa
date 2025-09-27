import { AxiosError } from 'axios';
import { useLocalization } from '~/translation/useLocalization';

import { sharedMessages } from '~/pages/shared/sharedMessages';
import { messages } from '../../messages';

export const useChangePinErrorHandler = () => {
  const { formatMessage } = useLocalization();

  const handleError = (error: unknown): string => {
    if (error instanceof AxiosError && error.response?.data.code) {
      const code = error.response.data.code;

      switch (code) {
        case 'User.NotFound':
          return formatMessage(sharedMessages.somethingWentWrong);
        case 'User.InvalidCurrentPin':
          return formatMessage(messages.invalidCurrentPin);
        case 'User.NewPinMustDiffer':
          return formatMessage(messages.newPinMustDiffer);
      }
    }

    return formatMessage(sharedMessages.somethingWentWrong);
  };

  return { handleError };
};
