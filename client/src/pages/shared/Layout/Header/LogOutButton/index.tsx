import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../messages';
import { useLogOutMutation } from './hooks/useLogOutMutation';
import { useLoggedUserContext } from '~/authentication/LoggedUserProvider';

import { createEffect, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { pages } from '~/navigation/pages';
import { SpinnerIcon } from '~/pages/shared/icons/SpinnerIcon';
import { ExitIcon } from '~/pages/shared/icons/ExitIcon';
import { useLogOutErrorHandler } from './hooks/useLogOutErrorHandler';

export const LogOutButton = () => {
  const [_loggedUserState, { clear }] = useLoggedUserContext();

  const navigate = useNavigate();

  const { handleError } = useLogOutErrorHandler();

  const { mutate, getIsSuccess, getIsPending, getError } = useLogOutMutation();

  const logOut = () => {
    mutate();
  };

  createEffect(() => {
    if (getIsSuccess()) {
      clear();
      navigate(pages.LogIn.paths[0], { replace: true });
    }
  });

  createEffect(() => {
    if (getError()) {
      handleError(getError());
    }
  });

  return (
    <button
      class="font-bold text-pallete-2 hover:underline cursor-pointer flex items-center justify-center"
      onClick={logOut}
      disabled={getIsPending()}>
      <ExitIcon class="size-5 mr-2" />

      <FormattedMessage message={messages.logOut} />

      <Show when={getIsPending()}>
        <SpinnerIcon class="animate-spin size-5 ml-2" />
      </Show>
    </button>
  );
};
