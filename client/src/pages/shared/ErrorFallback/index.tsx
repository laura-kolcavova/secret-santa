import { Component } from 'solid-js';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { sharedMessages } from '../sharedMessages';
import { Alert } from '../Alert';
import { WarningIcon } from '../icons/WarningIcon';
import { messages } from './messages';

export type ErrorFallbackProps = {
  error: Error;
};

export const ErrorFallback: Component<ErrorFallbackProps> = ({ error }) => {
  const reload = () => {
    window.location.reload();
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div class="min-h-screen flex items-center justify-center px-4 bg-pallete-1">
      <div class="max-w-xl w-full rounded-lg shadow-lg p-8  bg-white">
        <div class="mb-6 text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <WarningIcon class="size-10 text-red-600" />
          </div>

          <h1 class="text-2xl font-bold text-gray-900 mb-2">
            <FormattedMessage message={sharedMessages.somethingWentWrong} />
          </h1>

          <p class="text-gray-600 mb-4">
            <FormattedMessage message={messages.unexpectedError} />
          </p>
        </div>

        <div class="mb-10">
          <Alert color="danger" isDismissible={false}>
            <p>{error.message}</p>
          </Alert>
        </div>

        <div class="flex flex-col items-center gap-6">
          <button
            class="w-1/2 py-2 px-4 rounded text-white font-bold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
            onClick={reload}>
            Obnovit stránku
          </button>

          <button
            class="w-1/2 py-2 px-4 rounded text-white font-bold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-2 hover:bg-pallete-3 text-pallete-8"
            onClick={goBack}>
            Zpět
          </button>
        </div>
      </div>
    </div>
  );
};
