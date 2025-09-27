import { MessageDescriptor } from './MessageDescriptor';
import { useTranslationContext } from './TranslationProvider';

export const useLocalization = () => {
  const { getLocale, translate } = useTranslationContext();

  const formatMessage = (message: MessageDescriptor): string => {
    const translatedMessage = translate(message.id);

    return translatedMessage !== undefined ? translatedMessage : message.defaultMessage;
  };

  const formatDate = (isoString: string): string => {
    return new Date(isoString).toLocaleDateString(getLocale());
  };

  const formatTime = (isoString: string): string => {
    return new Date(isoString).toLocaleTimeString(getLocale());
  };

  return { formatMessage, formatDate, formatTime };
};
