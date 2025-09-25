import { A } from '@solidjs/router';
import { Component } from 'solid-js';
import { pages } from '~/navigation/pages';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from './messages';

export const ProfileCreatedInfo: Component = () => {
  return (
    <div class="flex flex-col items-center justify-center py-12">
      <span class="text-xl font-bold text-pallete-4 mb-4">
        <FormattedMessage message={messages.profileCreatedInfo} />
      </span>

      <A
        href={pages.LogIn.paths[0]}
        class="py-2 px-4 rounded font-bold text-lg cursor-pointer bg-pallete-2 hover:bg-pallete-3 text-pallete-8">
        <FormattedMessage message={messages.logIn} />
      </A>
    </div>
  );
};
