import { Component } from 'solid-js';
import { sharedMessages } from '~/pages/shared/sharedMessages';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { EditDrawGroupModal } from '../EditDrawGroupModal';
import { pages } from '~/navigation/pages';
import { useNavigate } from '@solidjs/router';
import { useModalContext } from '~/modals/ModalProvider';
import { DrawGroupDetailDto } from '~/api/drawGroups/dto/DrawGroupDetailDto';
import { ConfirmDeleteDrawGroupModal } from '../ConfirmDeleteDrawGroupModal';

export type HeaderButtonsProps = {
  drawGroup: DrawGroupDetailDto | null | undefined;
  refetch: () => void;
};

export const HeaderButtons: Component<HeaderButtonsProps> = (props) => {
  const navigate = useNavigate();

  const { openModal } = useModalContext();

  const goBack = () => {
    navigate(pages.DrawGroups.paths[0]);
  };

  const redirectToDrawGroups = () => {
    navigate(pages.DrawGroups.paths[0]);
  };

  const openEditDrawGroupModal = () => {
    openModal(() => (
      <EditDrawGroupModal drawGroup={props.drawGroup!} refetchDrawGroup={props.refetch} />
    ));
  };

  const openConfirmDeleteDrawGroupModal = () => {
    openModal(() => (
      <ConfirmDeleteDrawGroupModal
        drawGroup={props.drawGroup!}
        redirectToDrawGroups={redirectToDrawGroups}
      />
    ));
  };

  return (
    <div class="mb-4 flex items-center justify-end gap-4">
      <button
        onClick={goBack}
        class="px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:shadow-outline cursor-pointer text-pallete-8 bg-pallete-4 hover:bg-pallete-5">
        ← <FormattedMessage message={sharedMessages.back} />
      </button>

      <button
        disabled={!props.drawGroup}
        onClick={openEditDrawGroupModal}
        class="px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:shadow-outline cursor-pointer text-pallete-8 bg-pallete-4 hover:bg-pallete-5">
        <FormattedMessage message={sharedMessages.edit} />
      </button>

      <button
        disabled={!props.drawGroup}
        onClick={openConfirmDeleteDrawGroupModal}
        class="px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:shadow-outline cursor-pointer text-pallete-8 bg-pallete-2 hover:bg-pallete-3">
        <FormattedMessage message={sharedMessages.delete} />
      </button>
    </div>
  );
};
