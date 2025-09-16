import { Component, createSignal } from 'solid-js';
import { userClient } from '~/api/user/userClient';

export const LogIn: Component = () => {
  const [getEmailValue, setEmailValue] = createSignal<string>('');
  const [getPinValue, setPinValue] = createSignal<string>('');
  const [getErrorMessage, setErrorMessage] = createSignal<string>('');

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    console.log(getEmailValue(), getPinValue());

    const response = await userClient.login({
      email: getEmailValue(),
      pin: getPinValue(),
    });

    console.log(response);
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
            class="w-full py-2 px-4 rounded text-white font-bold bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline cursor-pointer">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};
