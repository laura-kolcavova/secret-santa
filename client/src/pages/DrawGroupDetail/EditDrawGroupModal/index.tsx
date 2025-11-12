import Dialog from '@corvu/dialog';
import { createEffect, createSignal, Show, VoidComponent } from 'solid-js';
import { DrawGroupDetailDto } from '~/api/drawGroups/dto/DrawGroupDetailDto';
import { useModalContext } from '~/modals/ModalProvider';
import { XMarkIcon } from '~/pages/shared/icons/XMarkIcon';
import { sharedMessages } from '~/pages/shared/sharedMessages';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { useEditDrawGroupMutation } from './hooks/useEditDrawGroupMutation';
import { useEditDrawGroupErrorHandler } from './hooks/useEditDrawGroupErrorHandler';
import { Alert } from '~/pages/shared/Alert';
import { messages } from './messages';
import { DateTimePickerInput } from '~/pages/shared/DateTimePickerInput';

export type EditDrawGroupModalProps = {
  drawGroup: DrawGroupDetailDto;
  refetchDrawGroup: () => void;
};

export const EditDrawGroupModal: VoidComponent<EditDrawGroupModalProps> = ({
  drawGroup,
  refetchDrawGroup,
}) => {
  const { hideModal } = useModalContext();

  const { mutate, getIsError, getIsSuccess, getError } = useEditDrawGroupMutation();

  const { handleError } = useEditDrawGroupErrorHandler();

  const [getName, setName] = createSignal<string>(drawGroup.name);
  const [getDrawStartUtc, setDrawStartUtc] = createSignal<Date>(new Date(drawGroup.drawStartUtc));
  const [getDrawEndUtc, setDrawEndUtc] = createSignal<Date>(new Date(drawGroup.drawEndUtc));

  const save = () => {
    mutate({
      drawGroupGuid: drawGroup.guid,
      name: getName(),
      drawStartUtc: getDrawStartUtc().toISOString(),
      drawEndUtc: getDrawEndUtc().toISOString(),
    });
  };

  createEffect(() => {
    if (getIsSuccess()) {
      refetchDrawGroup();
      hideModal();
    }
  });

  return (
    <Dialog open={true} onEscapeKeyDown={hideModal}>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/25 data-open:animate-in data-open:fade-in-0% data-closed:animate-out data-closed:fade-out-0%" />
        <Dialog.Content class="min-w-lg min-h-120 fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-md border-1 px-6 py-5 data-open:animate-in data-open:fade-in-0% data-open:zoom-in-95% data-open:slide-in-from-top-10% data-closed:animate-out data-closed:fade-out-0% data-closed:zoom-out-95% data-closed:slide-out-to-top-10% border-gray-900 bg-white flex flex-col">
          <div class="mb-8 h-10 relative">
            <Dialog.Label class="text-xl font-medium text-center pr-10 -mr-10 text-pallete-6 ">
              {drawGroup.name}
            </Dialog.Label>

            <Dialog.Close
              class="p-1 cursor-pointer text-gray-600 hover:text-gray-500 absolute right-0 top-0"
              onClick={hideModal}>
              <XMarkIcon class="size-6" />
            </Dialog.Close>
          </div>

          <div class="flex-1 mb-8">
            <Show when={getIsError()}>
              <Alert color="danger" isDismissible={true}>
                <FormattedMessage message={handleError(getError())} />
              </Alert>
            </Show>

            <form class="w-full">
              <div class="mb-6">
                <label class="block mb-2 text-sm font-bold text-pallete-4" for="first-name">
                  <FormattedMessage message={messages.name} />
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength="256"
                  class="block w-full py-2 px-3 border rounded shadow focus:outline-none focus:shadow-outline text-gray-900 bg-gray-100"
                  value={getName()}
                  onInput={(e) => setName(e.currentTarget.value)}
                />
              </div>

              <div class="mb-6">
                <DateTimePickerInput
                  label={<FormattedMessage message={messages.drawStarts} />}
                  value={getDrawStartUtc()}
                  onChange={(newValue) => setDrawStartUtc(newValue)}
                />
              </div>

              <div class="mb-6">
                <DateTimePickerInput
                  label={<FormattedMessage message={messages.drawEnds} />}
                  value={getDrawEndUtc()}
                  onChange={(newValue) => setDrawEndUtc(newValue)}
                />
              </div>
            </form>
          </div>

          <div class="flex items-center justify-center gap-8">
            <Dialog.Close
              class="py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-2 hover:bg-pallete-3 text-pallete-8"
              onClick={hideModal}>
              <FormattedMessage message={sharedMessages.close} />
            </Dialog.Close>

            <button
              class="py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
              onClick={save}>
              <FormattedMessage message={sharedMessages.save} />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
