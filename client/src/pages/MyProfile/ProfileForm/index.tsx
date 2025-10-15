import { Component, createEffect, createSignal, For, Show } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { ProfileDto } from '~/api/user/dto/ProfileDto';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../messages';
import { HobbiesInput } from '~/pages/shared/HobbiesInput';
import { HobbyList } from '~/pages/shared/HobbyList';
import { useEditProfileMutation } from './hooks/useEditProfileMutation';
import { SpinnerIcon } from '~/pages/shared/icons/SpinnerIcon';
import { Alert } from '~/pages/shared/Alert';
import { useEditProfileErrorHandler } from './hooks/useEditProfileErrorHandler';
import { DepartmentSelect } from '~/pages/shared/DepartmentSelect';
import { useLoggedUserContext } from '~/authentication/LoggedUserProvider';

export type ProfileFormProps = {
  profile: ProfileDto;
};

export const ProfileForm: Component<ProfileFormProps> = (props) => {
  const [getFirstName, setFirstName] = createSignal<string>(props.profile.firstName);
  const [getLastName, setLastName] = createSignal<string>(props.profile.lastName);
  const [getDepartment, setDepartment] = createSignal<string>(props.profile.department);
  const [hobbies, setHobbies] = createStore<string[]>(props.profile.hobbies);

  const { editProfile, getIsPending, getIsSuccess, getIsError, getError, getData } =
    useEditProfileMutation();

  const [_, { setUser }] = useLoggedUserContext();

  const { handleError } = useEditProfileErrorHandler();

  const addHobby = (newHobby: string) => {
    setHobbies(produce((hobbies) => hobbies.push(newHobby)));
  };

  const removeHobby = (hobbyToRemove: string) => {
    setHobbies(produce((hobbies) => hobbies.splice(hobbies.indexOf(hobbyToRemove), 1)));
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    editProfile({
      firstName: getFirstName(),
      lastName: getLastName(),
      department: getDepartment(),
      hobbies: [...hobbies],
    });
  };

  createEffect(() => {
    if (getIsSuccess()) {
      setUser(getData()!);
    }
  });

  return (
    <>
      <Show when={getIsError()}>
        <Alert color="danger">{handleError(getError())}</Alert>
      </Show>

      <Show when={getIsSuccess()}>
        <Alert color="success">
          <FormattedMessage message={messages.profileWasSaved} />
        </Alert>
      </Show>

      <form onSubmit={handleSubmit} class="w-full max-w-xl">
        <div class="mb-6">
          <label class="block mb-2 text-sm font-bold text-pallete-4" for="first-name">
            <FormattedMessage message={messages.firstName} />
          </label>

          <input
            id="first-name"
            name="first-name"
            type="text"
            autocomplete="given-name"
            required
            maxLength="256"
            class="block w-full py-2 px-3 border rounded shadow focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
            value={getFirstName()}
            onInput={(e) => setFirstName(e.currentTarget.value)}
          />
        </div>

        <div class="mb-6">
          <label class="block mb-2 text-sm font-bold text-pallete-4" for="last-name">
            <FormattedMessage message={messages.lastName} />
          </label>

          <input
            id="last-name"
            name="last-name"
            type="text"
            autocomplete="family-name"
            required
            maxLength="256"
            class="block w-full py-2 px-3 border rounded shadow focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
            value={getLastName()}
            onInput={(e) => setLastName(e.currentTarget.value)}
          />
        </div>

        <div class="mb-6">
          <label class="block mb-2 text-sm font-bold text-pallete-4" for="department">
            <FormattedMessage message={messages.department} />
          </label>

          <DepartmentSelect
            id="department"
            name="department"
            setDepartment={setDepartment}
            getDepartment={getDepartment}
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-pallete-4" for="hobbies">
            <FormattedMessage message={messages.hobbies} />
          </label>

          <HobbiesInput id="hobbies" hobbies={hobbies} addHobby={addHobby} />
        </div>

        <div class="mb-12">
          <HobbyList hobbies={hobbies} removeHobby={removeHobby} />
        </div>

        <div class="flex justify-center">
          <button
            type="submit"
            class="w-1/2 py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
            disabled={getIsPending()}>
            <FormattedMessage message={messages.saveProfile} />

            <Show when={getIsPending()}>
              <SpinnerIcon class="animate-spin size-5 ml-2" />
            </Show>
          </button>
        </div>
      </form>
    </>
  );
};
