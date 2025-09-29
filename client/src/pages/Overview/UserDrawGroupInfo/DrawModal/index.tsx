import Dialog from '@corvu/dialog';
import { batch, createEffect, createSignal, Show, VoidComponent } from 'solid-js';
import { DrawGroupDto } from '~/api/drawGroups/dto/UserDrawGroupDto';
import { useModalContext } from '~/modals/ModalProvider';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from './messages';
import { XMarkIcon } from '~/pages/shared/icons/XMarkIcon';
import { useDrawParticipantMutation } from './hooks/useDrawParticipantMutation';
import { Alert } from '~/pages/shared/Alert';
import { useDrawParticipantErrorHandler } from './hooks/useDrawParticipantErrorHandler';

export type DrawModalProps = {
  drawGroup: DrawGroupDto;
};

export const DrawModal: VoidComponent<DrawModalProps> = ({ drawGroup }) => {
  const { hideModal } = useModalContext();

  const { mutate, getIsPending, getIsSuccess, getError } = useDrawParticipantMutation();

  const { handleError } = useDrawParticipantErrorHandler();

  const [getIsWaiting, setIsWaiting] = createSignal(false);

  const draw = () => {
    mutate(drawGroup.guid);
  };

  createEffect(() => {
    if (getIsSuccess()) {
      setTimeout(() => {
        setIsWaiting(true);
      }, 4000);
    }
  });

  const getIsDrawing = () => {
    return getIsWaiting() || getIsPending();
  };

  return (
    <Dialog open={true} onEscapeKeyDown={hideModal}>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/25 data-open:animate-in data-open:fade-in-0% data-closed:animate-out data-closed:fade-out-0%" />
        <Dialog.Content class="fixed left-1/2 top-1/2 z-50 min-w-180 min-h-80 -translate-x-1/2 -translate-y-1/2 rounded-md border-4 px-6 py-5 data-open:animate-in data-open:fade-in-0% data-open:zoom-in-95% data-open:slide-in-from-top-10% data-closed:animate-out data-closed:fade-out-0% data-closed:zoom-out-95% data-closed:slide-out-to-top-10% border-pallete-2 bg-white flex flex-col">
          <div class="mb-8 h-10 relative">
            <Dialog.Label class="text-2xl font-bold text-center text-pallete-6 pr-10">
              {drawGroup.name}
            </Dialog.Label>

            <Show when={!getIsDrawing()} fallback={<div></div>}>
              <Dialog.Close
                class="p-1 cursor-pointer text-gray-600 hover:text-gray-500 absolute right-0 top-0"
                onClick={hideModal}
                disabled={getIsDrawing()}>
                <XMarkIcon class="size-6" />
              </Dialog.Close>
            </Show>
          </div>

          <div class="flex-auto mb-8">
            <Show when={!getIsDrawing()}>
              <Dialog.Description class="text-lg font-normal text-center text-gray-600 mb-8 ">
                <FormattedMessage message={messages.description} />
              </Dialog.Description>
            </Show>

            <Show when={getError()}>
              <Alert color="danger" isDismissible={false}>
                <FormattedMessage message={handleError(getError())} />
              </Alert>
            </Show>

            <Show when={getIsDrawing()}>
              <Dialog.Description class="text-lg font-normal text-center text-gray-600 mb-8">
                <FormattedMessage message={messages.drawingInProgress} />
              </Dialog.Description>

              <div class="flex-auto flex flex-col items-center justify-center">
                <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-pallete-4 mb-4"></div>
              </div>
            </Show>
          </div>

          <Show when={!getIsDrawing()}>
            <div class="flex items-center justify-center gap-8">
              <Dialog.Close
                class="py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-2 hover:bg-pallete-3 text-pallete-8"
                onClick={hideModal}>
                <FormattedMessage message={messages.close} />
              </Dialog.Close>

              <button
                class="py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
                onClick={draw}>
                <FormattedMessage message={messages.draw} />
              </button>
            </div>
          </Show>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
