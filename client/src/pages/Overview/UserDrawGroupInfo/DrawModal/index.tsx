import Dialog from '@corvu/dialog';
import { onCleanup, VoidComponent } from 'solid-js';
import { DrawGroupDto } from '~/api/drawGroups/dto/UserDrawGroupDto';
import { useModalContext } from '~/modals/ModalProvider';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from './messages';

export type DrawModalProps = {
  drawGroup: DrawGroupDto;
};

export const DrawModal: VoidComponent<DrawModalProps> = ({ drawGroup }) => {
  const { hideModal } = useModalContext();

  return (
    <Dialog open={true}>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/25 data-open:animate-in data-open:fade-in-0% data-closed:animate-out data-closed:fade-out-0%" />
        <Dialog.Content class="fixed left-1/2 top-1/2 z-50 min-w-80 -translate-x-1/2 -translate-y-1/2 rounded-md border-4 px-6 py-5 data-open:animate-in data-open:fade-in-0% data-open:zoom-in-95% data-open:slide-in-from-top-10% data-closed:animate-out data-closed:fade-out-0% data-closed:zoom-out-95% data-closed:slide-out-to-top-10% border-pallete-2 bg-white">
          <Dialog.Label class="mb-8 text-xl font-bold text-center text-pallete-6">
            {drawGroup.name}
          </Dialog.Label>

          <Dialog.Description class="mb-8 text-lg font-normal text-gray-600">
            <FormattedMessage message={messages.description} />
          </Dialog.Description>

          <div class="flex items-center justify-center gap-8">
            <Dialog.Close
              class="py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-2 hover:bg-pallete-3 text-pallete-8"
              onClick={hideModal}>
              <FormattedMessage message={messages.close} />
            </Dialog.Close>

            <Dialog.Close
              class="py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
              onClick={hideModal}>
              <FormattedMessage message={messages.draw} />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
