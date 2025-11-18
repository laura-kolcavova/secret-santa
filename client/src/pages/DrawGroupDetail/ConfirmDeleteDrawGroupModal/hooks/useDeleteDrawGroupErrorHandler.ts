import { sharedMessages } from '~/pages/shared/sharedMessages';
import { MessageDescriptor } from '~/translation/MessageDescriptor';

export const useDeleteDrawGroupErrorHandler = () => {
  const handleError = (error: unknown): MessageDescriptor => {
    return sharedMessages.somethingWentWrong;
  };

  return { handleError };
};
