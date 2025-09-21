import { Component } from 'solid-js';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from './messages';

export const NotFound: Component = () => {
  return (
    <div class="container mx-auto py-6">
      <div class="py-24 text-center">
        <span class="text-xl font-bold text-pallete-4">
          <FormattedMessage message={messages.pageNotFound} />
        </span>
      </div>
    </div>
  );
};
