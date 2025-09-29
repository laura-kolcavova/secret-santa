import { sharedMessages } from '~/pages/shared/sharedMessages';
import { useLocalization } from '~/translation/useLocalization';

export const useEditProfileErrorHandler = () => {
  const { formatMessage } = useLocalization();

  const handleError = (error: unknown): string => {
    return formatMessage(sharedMessages.somethingWentWrong);
  };

  return { handleError };
};
