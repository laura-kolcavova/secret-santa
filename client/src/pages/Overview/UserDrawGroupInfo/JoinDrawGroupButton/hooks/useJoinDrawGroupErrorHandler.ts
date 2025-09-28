import { AxiosError } from 'axios';
import { useLocalization } from '~/translation/useLocalization';
import { sharedMessages } from '~/pages/shared/sharedMessages';
import toast from 'solid-toast';

export const useJoinDrawGroupErrorHandler = () => {
  const { formatMessage } = useLocalization();

  const handleError = (error: unknown): void => {
    let message: string;

    if (error instanceof AxiosError && error.response?.data.code) {
      const code = error.response.data.code;

      switch (code) {
        case 'DrawGroup.NotFound':
          message = formatMessage(sharedMessages.somethingWentWrong);
          break;
        case 'DrawGroup.UserAlreadyJoined':
          message = formatMessage(sharedMessages.somethingWentWrong);
          break;
      }
    }

    message = formatMessage(sharedMessages.somethingWentWrong);

    toast.error(message);
  };

  return { handleError };
};
