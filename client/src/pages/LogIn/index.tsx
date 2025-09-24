import { Component, createEffect, createSignal, Show } from 'solid-js';
import { useLoginMutation } from './hooks/useLoginMutation';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { Alert } from '../shared/Alert';
import { A, useNavigate } from '@solidjs/router';
import { pages } from '~/navigation/pages';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from './messages';
import { useLocalization } from '~/translation/useLocalization';

export const LogIn: Component = () => {
  const navigate = useNavigate();

  const { formatMessage } = useLocalization();

  const [getEmail, setEmail] = createSignal<string>('');
  const [getPin, setPin] = createSignal<string>('');

  const { login, getIsPending, getIsSuccess, getIsError, getErrorMessage } = useLoginMutation();

  createEffect(() => {
    if (getIsSuccess()) {
      navigate(pages.Overview.paths[0]);
    }
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    login({
      email: getEmail(),
      pin: getPin(),
    });
  };

  return (
    <div class="container mx-auto py-6">
      <Show when={getIsError()}>
        <Alert color="danger">{getErrorMessage()}</Alert>
      </Show>

      <form onSubmit={handleSubmit} class="mb-12 w-full max-w-xs mx-auto">
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
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 rounded text-white font-bold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
            disabled={getIsPending()}>
            <Show
              when={getIsPending()}
              fallback={
                <span>
                  <FormattedMessage message={messages.logIn} />
                </span>
              }>
              <SpinnerIcon class="animate-spin size-5" />
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
