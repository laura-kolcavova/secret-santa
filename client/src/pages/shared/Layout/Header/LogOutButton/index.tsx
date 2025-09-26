import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../messages';
import { useLogOutMutation } from './hooks/useLogOutMutation';
import { useLoggedUserContext } from '~/authentication/LoggedUserProvider';

import { createEffect, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { pages } from '~/navigation/pages';
import { SpinnerIcon } from '~/pages/shared/icons/SpinnerIcon';

export const LogOutButton = () => {
  const [_loggedUserState, { clear }] = useLoggedUserContext();

  const navigate = useNavigate();

  const { mutate, getIsSuccess, getIsPending } = useLogOutMutation();

  const handleClick = () => {
    mutate();
  };

  createEffect(() => {
    if (getIsSuccess()) {
      clear();
      navigate(pages.LogIn.paths[0], { replace: true });
    }
  });

  return (
    <button
      class="font-bold text-pallete-2 hover:underline cursor-pointer"
      onClick={handleClick}
      disabled={getIsPending()}>
      <FormattedMessage message={messages.logOut} />

      <Show when={getIsPending()}>
        <SpinnerIcon class="animate-spin size-5 ml-2" />
      </Show>
    </button>
  );
};
