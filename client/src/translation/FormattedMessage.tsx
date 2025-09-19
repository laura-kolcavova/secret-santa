import { Component } from 'solid-js';
import { MessageDescriptor } from './MessageDescriptor';
import { useLocalization } from './useLocalization';

export type FormattedMessageProps = {
  message: MessageDescriptor;
};

export const FormattedMessage: Component<FormattedMessageProps> = (props) => {
  const { formatMessage } = useLocalization();

  return formatMessage(props.message);
};
