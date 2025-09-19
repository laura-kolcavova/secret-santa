import { Component, createEffect, createSignal, For, Show } from 'solid-js';
import { Alert } from '../shared/Alert';
import { A, useNavigate } from '@solidjs/router';
import { pages } from '~/navigation/pages';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { useNewProfile } from './hooks/useNewProfile';
import { Department } from '~/models/Department';
import { HobbiesInput } from '../shared/HobbiesInput';
import { createStore, produce } from 'solid-js/store';
import { HobbyTag } from '../shared/HobbyTag';

export const NewProfile: Component = () => {
  const navigate = useNavigate();

  const { newProfile, getIsPending, getIsSuccess, getIsError, getErrorMessage } = useNewProfile();

  const [getEmailValue, setEmailValue] = createSignal<string>('');
  const [getPinValue, setPinValue] = createSignal<string>('');
  const [getPinConfirm, setPinConfirmValue] = createSignal<string>('');
  const [getFirstName, setFirstName] = createSignal<string>('');
  const [getLastName, setLastName] = createSignal<string>('');
  const [getDepartment, setDepartment] = createSignal<string>('');
  const [hobbies, setHobbies] = createStore<string[]>([]);

  createEffect(() => {
    if (getIsSuccess()) {
      navigate(pages.MyProfile.paths[0]);
    }
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (getPinValue() !== getPinConfirm()) {
      return;
    }

    newProfile({
      email: getEmailValue(),
      pin: getPinValue(),
      firstName: getFirstName(),
      lastName: getLastName(),
      department: getDepartment(),
      hobbies: [...hobbies],
    });
  };

  const addHobby = (newHobby: string) => {
    setHobbies(produce((hobbies) => hobbies.push(newHobby)));
  };

  const removeHobby = (hobbyToRemove: string) => {
    setHobbies(produce((hobbies) => hobbies.splice(hobbies.indexOf(hobbyToRemove), 1)));
  };

  return (
    <div class="container mx-auto py-12">
      <Show when={getIsError()}>
        <Alert color="danger">{getErrorMessage()}</Alert>
      </Show>

      <div class="flex flex-col items-center">
        <form onSubmit={handleSubmit} class="mb-12 w-full max-w-3xl grid grid-cols-2">
          <div class="mb-0 col-1 row-1 mr-6">
            <label class="block mb-2 text-sm font-bold text-pallete-4" for="email">
              E-mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full py-2 px-3 border rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
              placeholder="Zadejte email"
              onInput={(e) => setEmailValue(e.currentTarget.value)}
            />
          </div>

          <div class="mb-6 col-1 row-2 mr-6">
            <label class="block mb-2 text-sm font-bold text-pallete-4" for="pin">
              Pin (4 čísla)
            </label>

            <input
              id="pin"
              name="pin"
              type="password"
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

          <div class="mb-6 col-1 row-3 mr-6">
            <label class="block mb-2 text-sm font-bold text-pallete-4" for="pin-confirm">
              Pin (znovu)
            </label>

            <input
              id="pin-confirm"
              name="pin-confirm"
              type="password"
              autocomplete="off"
              required
              maxlength={4}
              inputmode="numeric"
              pattern="\d{4}"
              class="block w-full py-2 px-3 border rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
              placeholder="Zadejte stejný pin pro ověření"
              onInput={(e) => setPinConfirmValue(e.currentTarget.value)}
            />
          </div>

          <div class="mb-6 col-2 row-1">
            <label class="block mb-2 text-sm font-bold text-pallete-4" for="first-name">
              Jméno
            </label>

            <input
              id="first-name"
              name="first-name"
              type="text"
              autocomplete="given-name"
              required
              class="block w-full py-2 px-3 border rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
              placeholder="Zadejte jméno"
              onInput={(e) => setFirstName(e.currentTarget.value)}
            />
          </div>

          <div class="mb-6 col-2 row-2">
            <label class="block mb-2 text-sm font-bold text-pallete-4" for="last-name">
              Příjmení
            </label>

            <input
              id="last-name"
              name="last-name"
              type="text"
              autocomplete="family-name"
              required
              class="block w-full py-2 px-3 border rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
              placeholder="Zadejte příjmení"
              onInput={(e) => setLastName(e.currentTarget.value)}
            />
          </div>

          <div class="mb-6 col-2 row-3">
            <label class="block mb-2 text-sm font-bold text-pallete-4" for="department">
              Oddělení
            </label>

            <select
              id="department"
              name="department"
              required
              class="block w-full py-2 px-3 border rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100 cursor-pointer"
              onSelect={(e) => setDepartment(e.currentTarget.value)}>
              <For each={Object.values(Department)}>
                {(department) => <option value={department}>{department}</option>}
              </For>
            </select>
          </div>

          <div class="mb-4 col-1 row-4">
            <HobbiesInput id="hobbies" hobbies={hobbies} onAdd={addHobby} onRemove={removeHobby} />
          </div>

          <div class="col-span-2 row-5 mb-12">
            <Show when={hobbies.length > 0}>
              <div class="flex flex-row flex-wrap gap-2">
                <For each={hobbies}>
                  {(tag) => <HobbyTag tag={tag} removeTag={removeHobby}></HobbyTag>}
                </For>
              </div>
            </Show>
          </div>

          <div class="col-span-2 row-6 flex justify-center">
            <button
              type="submit"
              class="w-1/2 py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-7"
              disabled={getIsPending()}>
              <Show when={getIsPending()}>
                <SpinnerIcon class="animate-spin size-5 mr-2" />
              </Show>

              <Show when={!getIsPending()}>
                <span>Vytvořit</span>
              </Show>
            </button>
          </div>
        </form>

        <div>
          <span>
            Máte již profil?{' '}
            <A href={pages.LogIn.paths[0]} class="text-pallete-2 font-bold hover:underline">
              Přihlásit se
            </A>
          </span>
        </div>
      </div>
    </div>
  );
};
