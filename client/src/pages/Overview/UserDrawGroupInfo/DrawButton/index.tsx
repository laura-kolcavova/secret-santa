import { Component, createSignal } from 'solid-js';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../../messages';
import { DrawGroupDto } from '~/api/drawGroups/dto/UserDrawGroupDto';
import { DrawModal } from '../DrawModal';
import { useModalContext } from '~/modals/ModalProvider';

export type DrawButtonProps = {
  drawGroup: DrawGroupDto;
  refetchDrawGroup: () => void;
};

export const DrawButton: Component<DrawButtonProps> = ({ drawGroup, refetchDrawGroup }) => {
  const { openModal } = useModalContext();

  const draw = () => {
    openModal(() => <DrawModal drawGroup={drawGroup} refetchDrawGroup={refetchDrawGroup} />);
  };

  return (
    <button
      class="w-3/4 py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
      onClick={draw}>
      <FormattedMessage message={messages.draw} />
    </button>
  );
};
