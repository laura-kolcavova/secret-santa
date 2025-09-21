import { AxiosError } from 'axios';
import { sharedMessages } from '~/pages/shared/sharedMessages';
import { useLocalization } from '~/translation/useLocalization';

export const useEditProfileErrorHandler = () => {
  const { formatMessage } = useLocalization();

  const handleError = (error: unknown): string => {
    if (error instanceof AxiosError && error.response?.data.code) {
      const code = error.response.data.code;

      switch (code) {
        case 'User.NotFound':
          return formatMessage(sharedMessages.somethingWentWrong);
      }
    }

    return formatMessage(sharedMessages.somethingWentWrong);
  };

  return { handleError };
};
