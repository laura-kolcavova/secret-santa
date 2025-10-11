import { Component, createEffect, createSignal, Show } from 'solid-js';
import { useLoginMutation } from './hooks/useLoginMutation';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { Alert } from '../shared/Alert';
import { A, useNavigate } from '@solidjs/router';
import { pages } from '~/navigation/pages';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from './messages';
import { useLocalization } from '~/translation/useLocalization';
import { useLoggedUserContext } from '~/authentication/LoggedUserProvider';
import { useLoginErrorHandler } from './hooks/useLoginErrorHandler';

export const LogIn: Component = () => {
  const [loggedUserState] = useLoggedUserContext();

  const navigate = useNavigate();

  if (loggedUserState.isAuthenticated) {
    navigate(pages.Overview.paths[0]);

    return null;
  }

  return <LoginComponent />;
};

const LoginComponent: Component = () => {
  const { formatMessage } = useLocalization();

  const navigate = useNavigate();

  const [loggedUserState, { refresh }] = useLoggedUserContext();

  const [getEmail, setEmail] = createSignal<string>('');
  const [getPin, setPin] = createSignal<string>('');

  const {
    mutate: mutateLogin,
    getIsPending: getIsPendingLogin,
    getIsSuccess: getIsSuccessLogin,
    getIsError: getIsErrorLogin,
    getError: getErrorLogin,
  } = useLoginMutation();

  const { handleError: handleErrorLogin } = useLoginErrorHandler();

  createEffect(() => {
    if (getIsSuccessLogin()) {
      refresh();
    }
  });

  createEffect(() => {
    if (loggedUserState.isAuthenticated) {
      navigate(pages.Overview.paths[0], { replace: true });
    }
  });

  createEffect(() => {
    if (getIsErrorLogin()) {
      setPin('');
    }
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    mutateLogin({
      email: getEmail(),
      pin: getPin(),
    });
  };

  return (
    <div class="page-container mx-auto py-6">
      <Show when={getIsErrorLogin()}>
        <Alert color="danger">{handleErrorLogin(getErrorLogin())}</Alert>
      </Show>

      <form onSubmit={handleSubmit} class="mb-12 w-full max-w-xs mx-auto relative z-10 mt-32">
        <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-48 h-48">
          <img
            src="/images/santa.png"
            alt="santa"
            draggable="false"
            class="w-full h-full object-contain pointer-events-none"
          />
        </div>

        <div class="absolute -bottom-10 -left-48 w-48 h-48 -rotate-12">
          <img
            src="/images/present.png"
            alt="present"
            draggable="false"
            class="w-full h-full object-contain pointer-events-none"
          />
        </div>

        <div class="absolute -bottom-10 -right-48 w-48 h-48 rotate-64">
          <img
            src="/images/berries.png"
            alt="holly berries"
            draggable="false"
            class="w-full h-full object-contain pointer-events-none"
          />
        </div>

        <div class="mb-6">
          <label class="block mb-2 text-sm font-bold text-pallete-4" for="email">
            <FormattedMessage message={messages.email} />
          </label>

          <input
            id="email"
            type="email"
            name="email"
            autocomplete="email"
            required
            maxLength="256"
            class="block w-full py-2 px-3 border rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
            placeholder={formatMessage(messages.enterEmail)}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div class="mb-12">
          <label class="block mb-2 text-sm font-bold text-pallete-4" for="pin">
            <FormattedMessage message={messages.pin} />
          </label>

          <input
            id="pin"
            type="password"
            name="pin"
            autocomplete="off"
            required
            maxlength={4}
            inputmode="numeric"
            pattern="\d{4}"
            class="block w-full py-2 px-3 border rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
            placeholder={formatMessage(messages.enterPin)}
            onInput={(e) => setPin(e.currentTarget.value)}
            value={getPin()}
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 rounded text-white font-bold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
            disabled={getIsPendingLogin()}>
            <FormattedMessage message={messages.logIn} />

            <Show when={getIsPendingLogin()}>
              <SpinnerIcon class="animate-spin size-5 ml-2" />
            </Show>
          </button>
        </div>
      </form>

      <div class="flex justify-center">
        <span>
          <FormattedMessage message={messages.noProfileYet} />{' '}
          <A href={pages.NewProfile.paths[0]} class="text-pallete-2 font-bold hover:underline">
            <FormattedMessage message={messages.createNewProfile} />
          </A>
        </span>
      </div>
    </div>
  );
};
