import { batch, Component, createEffect, createSignal, For, Show } from 'solid-js';
import { Alert } from '../shared/Alert';
import { A, useNavigate } from '@solidjs/router';
import { pages } from '~/navigation/pages';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { useNewProfileMutation } from './hooks/useNewProfileMutation';
import { HobbiesInput } from '../shared/HobbiesInput';
import { createStore, produce } from 'solid-js/store';
import { FieldValidations } from '~/forms/FieldValidations';
import { FeedbackError } from '../shared/FeedbackError';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from './messages';
import { useLocalization } from '~/translation/useLocalization';
import { HobbyList } from '../shared/HobbyList';
import { ProfileCreatedInfo } from './ProfileCreatedInfo';
import { useLoggedUserContext } from '~/authentication/LoggedUserProvider';
import { useNewProfileErrorHandler } from './hooks/useNewProfileErrorHandler';
import { DepartmentSelect } from '../shared/DepartmentSelect';

export const NewProfile: Component = () => {
  const [loggedUserState] = useLoggedUserContext();

  const navigate = useNavigate();

  if (loggedUserState.isAuthenticated) {
    navigate(pages.Overview.paths[0]);

    return null;
  }

  return <NewProfileComponent />;
};

const NewProfileComponent: Component = () => {
  const { formatMessage } = useLocalization();

  const [getFirstName, setFirstName] = createSignal<string>('');
  const [getLastName, setLastName] = createSignal<string>('');
  const [getDepartment, setDepartment] = createSignal<string>('');
  const [getEmail, setEmail] = createSignal<string>('');
  const [getPin, setPin] = createSignal<string>('');
  const [getPinConfirm, setPinConfirm] = createSignal<string>('');
  const [hobbies, setHobbies] = createStore<string[]>([]);

  const [getFieldValidations, setFieldValidations] = createSignal<FieldValidations>({});

  const [getProfileCreated, setProfileCreated] = createSignal<boolean>(false);

  const { newProfile, getIsPending, getIsSuccess, getIsError, getError } = useNewProfileMutation();

  const { handleError } = useNewProfileErrorHandler();

  const addHobby = (newHobby: string) => {
    setHobbies(produce((hobbies) => hobbies.push(newHobby)));
  };

  const removeHobby = (hobbyToRemove: string) => {
    console.log('remove', hobbyToRemove);
    setHobbies(produce((hobbies) => hobbies.splice(hobbies.indexOf(hobbyToRemove), 1)));
  };

  const validate = (): boolean => {
    let newFieldvalidations: FieldValidations = {};
    let isValid = true;

    if (getPin() !== getPinConfirm()) {
      newFieldvalidations['pin-confirm'] = {
        isValid: false,
        errorMessage: formatMessage(messages.pinConfirmMismatch),
      };

      isValid = false;
    }

    setFieldValidations(newFieldvalidations);

    return isValid;
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    newProfile({
      email: getEmail(),
      pin: getPin(),
      firstName: getFirstName(),
      lastName: getLastName(),
      department: getDepartment(),
      hobbies: [...hobbies],
    });
  };

  createEffect(() => {
    if (getIsSuccess()) {
      setProfileCreated(true);
    }
  });

  createEffect(() => {
    if (getIsError()) {
      batch(() => {
        setPin('');
        setPinConfirm('');
      });
    }
  });

  return (
    <div class="container mx-auto py-6">
      <Show when={!getProfileCreated()} fallback={<ProfileCreatedInfo />}>
        <h1 class="text-2xl font-bold mb-8 text-center">
          <FormattedMessage message={messages.newProfile} />
        </h1>

        <Show when={getIsError()}>
          <Alert color="danger">{handleError(getError())}</Alert>
        </Show>

        <form onSubmit={handleSubmit} class="mb-12 w-full max-w-3xl grid grid-cols-2 mx-auto">
          <div class="mb-6 col-1 row-1 mr-6">
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
              class="block w-full py-2 px-3 border rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
              placeholder={formatMessage(messages.enterFirstName)}
              onInput={(e) => setFirstName(e.currentTarget.value)}
            />
          </div>

          <div class="mb-6 col-1 row-2 mr-6">
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
              class="block w-full py-2 px-3 border rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
              placeholder={formatMessage(messages.enterLastName)}
              onInput={(e) => setLastName(e.currentTarget.value)}
            />
          </div>

          <div class="mb-6 col-1 row-3 mr-6">
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

          <div class="mb-6 col-2 row-1">
            <label class="block mb-2 text-sm font-bold text-pallete-4" for="email">
              <FormattedMessage message={messages.email} />
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              maxLength="256"
              class="block w-full py-2 px-3 border rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
              placeholder={formatMessage(messages.enterEmail)}
              onInput={(e) => setEmail(e.currentTarget.value)}
            />
          </div>

          <div class="mb-6 col-2 row-2">
            <label class="block mb-2 text-sm font-bold text-pallete-4" for="pin">
              <FormattedMessage message={messages.pin} />
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
              placeholder={formatMessage(messages.enterPin)}
              onInput={(e) => setPin(e.currentTarget.value)}
              value={getPin()}
            />
          </div>

          <div class="mb-6 col-2 row-3">
            <label class="block mb-2 text-sm font-bold text-pallete-4" for="pin-confirm">
              <FormattedMessage message={messages.pinConfirm} />
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
              placeholder={formatMessage(messages.enterPinConfirm)}
              onInput={(e) => setPinConfirm(e.currentTarget.value)}
              value={getPinConfirm()}
            />

            <Show
              when={
                getFieldValidations()['pin-confirm'] &&
                !getFieldValidations()['pin-confirm'].isValid
              }>
              <FeedbackError errorMessage={getFieldValidations()['pin-confirm'].errorMessage!} />
            </Show>
          </div>

          <div class="mb-4 col-1 row-4 mr-6">
            <label class="block mb-2 text-sm font-bold text-pallete-4" for="hobbies">
              <FormattedMessage message={messages.hobbies} />
            </label>

            <HobbiesInput id="hobbies" hobbies={hobbies} addHobby={addHobby} />
          </div>

          <div class="col-span-2 row-5 mb-12">
            <HobbyList hobbies={hobbies} removeHobby={removeHobby} />
          </div>

          <div class="col-span-2 row-6 flex justify-center">
            <button
              type="submit"
              class="w-1/2 py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
              disabled={getIsPending()}>
              <FormattedMessage message={messages.create} />
              <Show when={getIsPending()}>
                <SpinnerIcon class="animate-spin size-5 ml-2" />
              </Show>
            </button>
          </div>
        </form>

        <div class="flex justify-center">
          <span>
            <FormattedMessage message={messages.alreadyHaveProfile} />{' '}
            <A href={pages.LogIn.paths[0]} class="text-pallete-2 font-bold hover:underline">
              <FormattedMessage message={messages.logIn} />
            </A>
          </span>
        </div>
      </Show>
    </div>
  );
};
