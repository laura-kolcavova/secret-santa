import { Component } from 'solid-js';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../../messages';
import { DrawModal } from '../DrawModal';
import { useModalContext } from '~/modals/ModalProvider';
import { DrawGroupDto } from '~/api/drawGroups/dto/UserDrawGroupListDto';

export type DrawButtonProps = {
  drawGroup: DrawGroupDto;
  refetchDrawGroup: () => void;
};

export const DrawButton: Component<DrawButtonProps> = ({ drawGroup, refetchDrawGroup }) => {
  const { openModal } = useModalContext();

  const draw = () => {
    openModal((index) => (
      <DrawModal drawGroup={drawGroup} index={index} refetchDrawGroup={refetchDrawGroup} />
    ));
  };

  return (
    <button
      class="w-3/4 py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
      onClick={draw}>
      <FormattedMessage message={messages.draw} />
    </button>
  );
};
