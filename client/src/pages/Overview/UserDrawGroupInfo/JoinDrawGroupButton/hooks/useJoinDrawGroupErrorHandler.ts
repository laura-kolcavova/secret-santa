import { useLocalization } from '~/translation/useLocalization';
import { sharedMessages } from '~/pages/shared/sharedMessages';
import toast from 'solid-toast';

export const useJoinDrawGroupErrorHandler = () => {
  const { formatMessage } = useLocalization();

  const handleError = (error: unknown): void => {
    const message = formatMessage(sharedMessages.somethingWentWrong);

    toast.error(message);
  };

  return { handleError };
};
