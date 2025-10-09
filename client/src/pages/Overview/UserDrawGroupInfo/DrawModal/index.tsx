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
import { sharedMessages } from '~/pages/shared/sharedMessages';
import { DrawnParticipantButton } from './DrawnParticipantButton';
import { ShakingPresent } from './ShakingPresent';

export type DrawModalProps = {
  drawGroup: DrawGroupDto;
  refetchDrawGroup: () => void;
};

export const DrawModal: VoidComponent<DrawModalProps> = ({ drawGroup, refetchDrawGroup }) => {
  const { hideModal } = useModalContext();

  const { mutate, getIsPending, getIsSuccess, getData, getError } = useDrawParticipantMutation();

  const { handleError } = useDrawParticipantErrorHandler();

  const [getIsWaiting, setIsWaiting] = createSignal(false);

  const [getIsDrawnFinished, setIsDrawnFinished] = createSignal(false);

  const draw = () => {
    mutate(drawGroup.guid);
  };

  createEffect(() => {
    if (getIsSuccess()) {
      setIsWaiting(true);
      setTimeout(() => {
        batch(() => {
          setIsWaiting(false);
          setIsDrawnFinished(true);
          refetchDrawGroup();
        });
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
        <Dialog.Content class="min-w-180 min-h-80 fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-md border-4 px-6 py-5 data-open:animate-in data-open:fade-in-0% data-open:zoom-in-95% data-open:slide-in-from-top-10% data-closed:animate-out data-closed:fade-out-0% data-closed:zoom-out-95% data-closed:slide-out-to-top-10% border-pallete-2 bg-white flex flex-col">
          <div class="mb-8 h-10 relative">
            <Dialog.Label class="text-2xl font-bold text-center pr-10 -mr-10 text-pallete-6 ">
              {drawGroup.name}
            </Dialog.Label>

            <Dialog.Close
              class="p-1 cursor-pointer text-gray-600 hover:text-gray-500 absolute right-0 top-0"
              onClick={hideModal}>
              <XMarkIcon class="size-6" />
            </Dialog.Close>
          </div>

          <div class="flex-1 mb-8">
            <Show
              when={!getIsDrawing()}
              fallback={
                <>
                  <Dialog.Description class="text-lg font-normal text-center text-gray-600 mb-8">
                    <FormattedMessage message={messages.drawingInProgress} />
                  </Dialog.Description>

                  <ShakingPresent />
                </>
              }>
              <Show
                when={getIsDrawnFinished()}
                fallback={
                  <>
                    <Dialog.Description class="mb-8 text-lg font-normal text-center text-gray-600 ">
                      <FormattedMessage message={messages.description} />
                    </Dialog.Description>

                    <Show when={getError()}>
                      <Alert color="danger" isDismissible={true}>
                        <FormattedMessage message={handleError(getError())} />
                      </Alert>
                    </Show>

                    <div class="w-64 h-64 mx-auto -m-10">
                      <img
                        src="/images/present.png"
                        alt="present"
                        draggable="false"
                        class="w-full h-full object-contain pointer-events-none"
                      />
                    </div>
                  </>
                }>
                <div class="flex flex-col justify-center">
                  <div class="mb-4 text-base text-center font-medium text-gray-600">
                    <FormattedMessage message={messages.youHaveDrawn} />
                  </div>

                  <DrawnParticipantButton drawnParticipant={getData()!.drawnParticipant} />
                </div>
              </Show>
            </Show>
          </div>

          <div class="flex items-center justify-center gap-8">
            <Dialog.Close
              class="py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-2 hover:bg-pallete-3 text-pallete-8"
              onClick={hideModal}>
              <FormattedMessage message={sharedMessages.close} />
            </Dialog.Close>

            <Show when={!getIsDrawing() && !getIsDrawnFinished()}>
              <button
                class="py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
                onClick={draw}>
                <FormattedMessage message={messages.draw} />
              </button>
            </Show>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
