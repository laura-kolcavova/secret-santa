import { Component, createEffect, createSignal, Show } from 'solid-js';
import { useLogin } from './hooks/useLogin';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { Alert } from '../shared/Alert';
import { A, useNavigate } from '@solidjs/router';
import { pages } from '~/navigation/pages';

export const LogIn: Component = () => {
  const navigate = useNavigate();

  const { login, getIsPending, getIsSuccess, getIsError, getErrorMessage } = useLogin();

  const [getEmailValue, setEmailValue] = createSignal<string>('');
  const [getPinValue, setPinValue] = createSignal<string>('');

  createEffect(() => {
    if (getIsSuccess()) {
      navigate(pages.MyProfile.paths[0]);
    }
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    login({
      email: getEmailValue(),
      pin: getPinValue(),
    });
  };

  return (
    <div class="container mx-auto py-12">
      <Show when={getIsError()}>
        <Alert color="danger">{getErrorMessage()}</Alert>
      </Show>

      <div class="flex flex-col items-center">
        <form onSubmit={handleSubmit} class="mb-12 w-full max-w-xs">
          <div class="mb-6">
            <label class="block mb-2 text-sm font-bold text-pallete-4" for="email">
              E-mail
            </label>

            <input
              id="email"
              type="email"
              name="email"
              autocomplete="email"
              required
              class="block w-full py-2 px-3 border rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
              placeholder="Zadejte email"
              onInput={(e) => setEmailValue(e.currentTarget.value)}
            />
          </div>

          <div class="mb-12">
            <label class="block mb-2 text-sm font-bold text-pallete-4" for="pin">
              Pin (4 čísla)
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
              placeholder="Zadejte pin"
              onInput={(e) => setPinValue(e.currentTarget.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              class="w-full py-2 px-4 rounded text-white font-bold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-7"
              disabled={getIsPending()}>
              <Show when={getIsPending()}>
                <SpinnerIcon class="animate-spin size-5 mr-2" />
              </Show>

              <Show when={!getIsPending()}>
                <span>Přihlásit se</span>
              </Show>
            </button>
          </div>
        </form>

        <div>
          <span>
            Ještě nemáte profil?{' '}
            <A href={pages.NewProfile.paths[0]} class="text-pallete-2 font-bold hover:underline">
              Vytvořit nový profil
            </A>
          </span>
        </div>
      </div>
    </div>
  );
};
