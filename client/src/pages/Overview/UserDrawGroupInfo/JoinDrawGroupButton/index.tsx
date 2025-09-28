import { Component, createEffect, Show } from 'solid-js';
import { messages } from '../../messages';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { useJoinDrawGroupMutation } from '../hooks/useJoinDrawGroupMutation';
import { SpinnerIcon } from '~/pages/shared/icons/SpinnerIcon';

export type JoinDrawGroupButtonProps = {
  drawGroupGuid: string;
  refetchDrawGroup: () => void;
};

export const JoinDrawGroupButton: Component<JoinDrawGroupButtonProps> = (props) => {
  const { mutate, getIsPending, getIsSuccess } = useJoinDrawGroupMutation();

  const joinDrawGroup = (): void => {
    mutate(props.drawGroupGuid);
  };

  createEffect(() => {
    if (getIsSuccess()) {
      props.refetchDrawGroup();
    }
  });

  return (
    <button
      class="w-3/4 py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
      onClick={joinDrawGroup}
      disabled={getIsPending()}>
      <FormattedMessage message={messages.joinDraw} />

      <Show when={getIsPending()}>
        <SpinnerIcon class="animate-spin size-5 ml-2" />
      </Show>
    </button>
  );
};
