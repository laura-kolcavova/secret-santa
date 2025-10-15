import { batch, Component, createEffect, createSignal, Show } from 'solid-js';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../messages';
import { SpinnerIcon } from '../../shared/icons/SpinnerIcon';
import { FieldValidations } from '~/forms/FieldValidations';
import { FeedbackError } from '../../shared/FeedbackError';
import { useChangePinMutation } from './hooks/useChangePinMutation';
import { Alert } from '../../shared/Alert';
import { useLocalization } from '~/translation/useLocalization';
import { useChangePinErrorHandler } from './hooks/useChangePinErrorHandler';

export const ChangePinForm: Component = () => {
  const { formatMessage } = useLocalization();

  const [getCurrentPin, setCurrentPin] = createSignal<string>('');
  const [getNewPin, setNewPin] = createSignal<string>('');
  const [getNewPinConfirm, setNewPinConfirm] = createSignal<string>('');

  const [getFieldValidations, setFieldValidations] = createSignal<FieldValidations>({});

  const { changePin, getIsPending, getIsSuccess, getIsError, getError } = useChangePinMutation();

  const { handleError } = useChangePinErrorHandler();

  const validate = (): boolean => {
    let newFieldvalidations: FieldValidations = {};
    let isValid = true;

    if (getNewPin() !== getNewPinConfirm()) {
      newFieldvalidations['new-pin-confirm'] = {
        isValid: false,
        errorMessage: formatMessage(messages.newPinConfirmMismatch),
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

    changePin({
      currentPin: getCurrentPin(),
      newPin: getNewPin(),
    });
  };

  createEffect(() => {
    if (getIsSuccess()) {
      batch(() => {
        setCurrentPin('');
        setNewPin('');
        setNewPinConfirm('');
      });
    }
  });

  return (
    <>
      <Show when={getIsError()}>
        <Alert color="danger">{handleError(getError())}</Alert>
      </Show>

      <Show when={getIsSuccess()}>
        <Alert color="success">
          <FormattedMessage message={messages.pinWasChanged} />
        </Alert>
      </Show>

      <form onSubmit={handleSubmit} class="w-full max-w-xl">
        <div class="mb-6 col-2 row-2">
          <label class="block mb-2 text-sm font-bold text-pallete-4" for="current-pin">
            <FormattedMessage message={messages.currentPin} />
          </label>

          <input
            id="current-pin"
            name="current-pin"
            type="password"
            autocomplete="off"
            required
            maxlength={4}
            inputmode="numeric"
            pattern="\d{4}"
            class="block w-full py-2 px-3 border rounded shadow focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
            onInput={(e) => setCurrentPin(e.currentTarget.value)}
            value={getCurrentPin()}
          />

          <Show
            when={
              getFieldValidations()['current-pin'] && !getFieldValidations()['current-pin'].isValid
            }>
            <FeedbackError errorMessage={getFieldValidations()['current-pin'].errorMessage!} />
          </Show>
        </div>

        <div class="mb-6 col-2 row-2">
          <label class="block mb-2 text-sm font-bold text-pallete-4" for="new-pin">
            <FormattedMessage message={messages.newPin} />
          </label>

          <input
            id="new-pin"
            name="new-pin"
            type="password"
            autocomplete="off"
            required
            maxlength={4}
            inputmode="numeric"
            pattern="\d{4}"
            class="block w-full py-2 px-3 border rounded shadow focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
            onInput={(e) => setNewPin(e.currentTarget.value)}
            value={getNewPin()}
          />

          <Show
            when={getFieldValidations()['new-pin'] && !getFieldValidations()['new-pin'].isValid}>
            <FeedbackError errorMessage={getFieldValidations()['new-pin'].errorMessage!} />
          </Show>
        </div>

        <div class="mb-6 col-2 row-2">
          <label class="block mb-2 text-sm font-bold text-pallete-4" for="new-pin-confirm">
            <FormattedMessage message={messages.newPinConfirm} />
          </label>

          <input
            id="new-pin-confirm"
            name="new-pin-confirm"
            type="password"
            autocomplete="off"
            required
            maxlength={4}
            inputmode="numeric"
            pattern="\d{4}"
            class="block w-full py-2 px-3 border rounded shadow focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
            onInput={(e) => setNewPinConfirm(e.currentTarget.value)}
            value={getNewPinConfirm()}
          />

          <Show
            when={
              getFieldValidations()['new-pin-confirm'] &&
              !getFieldValidations()['new-pin-confirm'].isValid
            }>
            <FeedbackError errorMessage={getFieldValidations()['new-pin-confirm'].errorMessage!} />
          </Show>
        </div>

        <div class="flex justify-center">
          <button
            type="submit"
            class="w-1/2 py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
            disabled={getIsPending()}>
            <FormattedMessage message={messages.changePin} />

            <Show when={getIsPending()}>
              <SpinnerIcon class="animate-spin size-5 ml-2" />
            </Show>
          </button>
        </div>
      </form>
    </>
  );
};
