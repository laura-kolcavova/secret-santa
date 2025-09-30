import { Component } from 'solid-js';
import { DrawnParticipantDto } from '~/api/drawGroups/dto/UserDrawGroupDto';
import { useModalContext } from '~/modals/ModalProvider';
import { EnterIcon } from '~/pages/shared/icons/EnterIcon';
import { DrawnParticipantModal } from '../DrawnParticipantModal';

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
    <button
      class="text-xl font-bold hover:underline cursor-pointer flex items-center justify-center text-pallete-4"
      onClick={showDrawnParticipantCard}>
      {drawnParticipant.fullName}

      <EnterIcon class="size-5 ml-2" />
    </button>
  );
};
