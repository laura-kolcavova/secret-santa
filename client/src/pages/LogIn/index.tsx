import { Component, createEffect, createSignal, Show } from 'solid-js';
import { useLogin } from './hooks/useLogin';

export const LogIn: Component = () => {
  const { login, getIsPending, getIsError, getIsSuccess } = useLogin();

  const [getEmailValue, setEmailValue] = createSignal<string>('');
  const [getPinValue, setPinValue] = createSignal<string>('');
  const [getErrorMessage, setErrorMessage] = createSignal<string>('');

  createEffect(() => {
    console.log('IsPending', getIsPending());
  });

  createEffect(() => {
    console.log('IsError', getIsError());
  });

  createEffect(() => {
    console.log('IsSuccess', getIsSuccess());
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    login({
      email: getEmailValue(),
      pin: getPinValue(),
    });
  };

  return (
    <div class="container mx-auto py-12 flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
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
        <div class="mb-6">
          <label class="block mb-2 text-sm font-bold text-gray-700" for="pin">
            Pin (4 čísla)
          </label>

          <input
            id="pin"
            type="text"
            name="pin"
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
            class="w-full py-2 px-4 rounded text-white font-bold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center"
            disabled={getIsPending()}>
            <Show when={getIsPending()}>
              <svg
                class="inline-block animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span>Přihlašování...</span>
            </Show>

            <Show when={!getIsPending()}>
              <span>Přihlásit se</span>
            </Show>
          </button>
        </div>
      </form>
    </div>
  );
};
