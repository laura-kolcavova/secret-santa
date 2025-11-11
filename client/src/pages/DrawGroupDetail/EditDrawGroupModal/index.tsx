import Dialog from '@corvu/dialog';
import { VoidComponent } from 'solid-js';
import { DrawGroupDetailDto } from '~/api/drawGroups/dto/DrawGroupDetailDto';
import { useModalContext } from '~/modals/ModalProvider';
import { XMarkIcon } from '~/pages/shared/icons/XMarkIcon';
import { sharedMessages } from '~/pages/shared/sharedMessages';
import { FormattedMessage } from '~/translation/FormattedMessage';

export type EditDrawGroupModalProps = {
  drawGroup: DrawGroupDetailDto;
  refetchDrawGroup: () => void;
};

export const EditDrawGroupModal: VoidComponent<EditDrawGroupModalProps> = ({
  drawGroup,
  refetchDrawGroup,
}) => {
  const { hideModal } = useModalContext();

  const { mutate, getIsPending, getIsSuccess, getData, getError } = useDrawParticipantMutation();

  const { handleError } = useDrawParticipantErrorHandler();

  const save = () => {
    mutate(drawGroup.guid);
  };

  return (
    <Dialog open={true} onEscapeKeyDown={hideModal}>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/25 data-open:animate-in data-open:fade-in-0% data-closed:animate-out data-closed:fade-out-0%" />
        <Dialog.Content class="min-w-180 min-h-120 fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-md border-4 px-6 py-5 data-open:animate-in data-open:fade-in-0% data-open:zoom-in-95% data-open:slide-in-from-top-10% data-closed:animate-out data-closed:fade-out-0% data-closed:zoom-out-95% data-closed:slide-out-to-top-10% border-pallete-2 bg-white flex flex-col">
          <div class="mb-6 h-10 relative">
            <Dialog.Label class="text-xl font-medium text-center pr-10 -mr-10 text-pallete-6 ">
              {drawGroup.name}
            </Dialog.Label>

            <Dialog.Close
              class="p-1 cursor-pointer text-gray-600 hover:text-gray-500 absolute right-0 top-0"
              onClick={hideModal}>
              <XMarkIcon class="size-6" />
            </Dialog.Close>
          </div>

          <div class="flex-1 mb-6 flex flex-col justify-center"></div>

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
