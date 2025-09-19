import { MessageDescriptor } from './MessageDescriptor';
import { useTranslation } from './TranslationProvider';

export const useLocalization = () => {
  const { translate } = useTranslation();

  const formatMessage = (message: MessageDescriptor) => {
    const translatedMessage = translate(message.id);

    return translatedMessage !== undefined ? translatedMessage : message.defaultMessage;
  };

  return { formatMessage };
};
