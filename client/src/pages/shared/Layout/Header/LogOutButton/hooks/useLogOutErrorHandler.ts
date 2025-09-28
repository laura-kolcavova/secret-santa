import toast from 'solid-toast';
import { sharedMessages } from '~/pages/shared/sharedMessages';
import { useLocalization } from '~/translation/useLocalization';

export const useLogOutErrorHandler = () => {
  const { formatMessage } = useLocalization();

  const handleError = (error: unknown): void => {
    const message = formatMessage(sharedMessages.somethingWentWrong);

    toast.error(message);
  };

  return { handleError };
};
