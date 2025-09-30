import Dialog from '@corvu/dialog';
import { VoidComponent } from 'solid-js';
import { DrawnParticipantDto } from '~/api/drawGroups/dto/UserDrawGroupDto';
import { useModalContext } from '~/modals/ModalProvider';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { XMarkIcon } from '~/pages/shared/icons/XMarkIcon';
import { sharedMessages } from '~/pages/shared/sharedMessages';
import { HobbyList } from '~/pages/shared/HobbyList';
import { messages } from './messages';

export type DrawnParticipantModalProps = {
  drawnParticipant: DrawnParticipantDto;
};

export const DrawnParticipantModal: VoidComponent<DrawnParticipantModalProps> = ({
  drawnParticipant,
}) => {
  const { hideModal } = useModalContext();

  return (
    <Dialog open={true} onEscapeKeyDown={hideModal}>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-50 bg-black/25 data-open:animate-in data-open:fade-in-0% data-closed:animate-out data-closed:fade-out-0%" />
        <Dialog.Content class=" min-w-lg min-h-lg fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-md border-1 px-6 py-5 data-open:animate-in data-open:fade-in-0% data-open:zoom-in-95% data-open:slide-in-from-top-10% data-closed:animate-out data-closed:fade-out-0% data-closed:zoom-out-95% data-closed:slide-out-to-top-10% border-gray-900 bg-white flex flex-col">
          <div class="mb-6 h-10 relative">
            <Dialog.Label class="text-xl font-medium text-center pr-10 -mr-10 text-pallete-6">
              Váš obdarovaný
            </Dialog.Label>

            <Dialog.Close
              class="p-1 cursor-pointer text-gray-600 hover:text-gray-500 absolute right-0 top-0"
              onClick={hideModal}>
              <XMarkIcon class="size-6" />
            </Dialog.Close>
          </div>

          <div class="flex-1">
            <div class=" text-center mb-6">
              <div class="w-16 h-16 bg-pallete-4 rounded-full mx-auto mb-2 relative">
                <span class="text-2xl font-bold text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {drawnParticipant.fullName
                    .split(' ')
                    .map((name) => name[0])
                    .join('')}
                </span>
              </div>

              <h3 class="text-xl font-bold text-pallete-6 mb-2">{drawnParticipant.fullName}</h3>

              <p class="text-lg font-semibold text-gray-600 mb-4">{drawnParticipant.email}</p>

              <p class="text-base font-medium text-gray-600">{drawnParticipant.department}</p>
            </div>

            <div class="mb-6">
              <h4 class="text-base font-medium text-pallete-6 mb-2">
                <FormattedMessage message={messages.hobbies} />
              </h4>

              <HobbyList hobbies={drawnParticipant.hobbies} />
            </div>
          </div>

          <div class="flex justify-center">
            <Dialog.Close
              class="py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-2 hover:bg-pallete-3 text-pallete-8"
              onClick={hideModal}>
              <FormattedMessage message={sharedMessages.close} />
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
