import { Component } from 'solid-js';
import { useModalContext } from '~/modals/ModalProvider';
import { EnterIcon } from '~/pages/shared/icons/EnterIcon';
import { DrawnParticipantModal } from '../DrawnParticipantModal';
import { DrawnParticipantDto } from '~/api/drawGroups/dto/UserDrawGroupListDto';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../../messages';

export type DrawnParticipantButtonProps = {
  drawnParticipant: DrawnParticipantDto;
};

export const DrawnParticipantButton: Component<DrawnParticipantButtonProps> = ({
  drawnParticipant,
}) => {
  const { openModal } = useModalContext();

  const showDrawnParticipantCard = () => {
    openModal(() => <DrawnParticipantModal drawnParticipant={drawnParticipant} />);
  };

  return (
    <div class="flex flex-col items-center">
      <span class="mb-2 text-lg font-bold text-pallete-4" onClick={showDrawnParticipantCard}>
        {drawnParticipant.fullName}
      </span>

      <button
        class="hover:underline cursor-pointer text-base font-medium flex items-center justify-center text-pallete-4"
        onClick={showDrawnParticipantCard}>
        <FormattedMessage message={messages.checkOutMyHobbies} />

        <EnterIcon class="size-5 ml-2" />
      </button>
    </div>
  );
};
