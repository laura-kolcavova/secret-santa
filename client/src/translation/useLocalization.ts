import { MessageDescriptor } from './MessageDescriptor';
import { useTranslationContext } from './TranslationProvider';

export const useLocalization = () => {
  const { translate } = useTranslationContext();

  const formatMessage = (message: MessageDescriptor) => {
    const translatedMessage = translate(message.id);

    return translatedMessage !== undefined ? translatedMessage : message.defaultMessage;
  };

  return { formatMessage };
};
