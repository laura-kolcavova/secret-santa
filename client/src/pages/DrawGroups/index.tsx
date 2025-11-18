import { Component, For, Match, Switch } from 'solid-js';
import { UserLayout } from '../shared/UserLayout';
import { useDrawGroupListQuery } from './hooks/useDrawGroupListQuery';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { Alert } from '../shared/Alert';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { sharedMessages } from '../shared/sharedMessages';
import { DrawGroupListItem } from './DrawGroupListItem';
import { messages } from './messages';
import { useModalContext } from '~/modals/ModalProvider';
import { NewDrawGroupModal } from './NewDrawGroupModal';
import { useNavigate } from '@solidjs/router';
import { pages } from '~/navigation/pages';

export const DrawGroups: Component = () => {
  const { openModal } = useModalContext();

  const navigate = useNavigate();

  const [data] = useDrawGroupListQuery();

  const redirectToNewDrawGroup = (drawGroupGuid: string) => {
    navigate(pages.DrawGroupDetail.paths[0].replace(':guid', drawGroupGuid));
  };

  const openNewDrawGroupModal = () => {
    openModal(() => <NewDrawGroupModal redirectToNewDrawGroup={redirectToNewDrawGroup} />);
  };

  return (
    <UserLayout>
      <div class="mb-4 flex items-center justify-end gap-4">
        <button
          disabled={data.loading}
          onClick={openNewDrawGroupModal}
          class="px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:shadow-outline cursor-pointer text-pallete-8 bg-pallete-4 hover:bg-pallete-5">
          <FormattedMessage message={messages.newDrawGroup} />
        </button>
      </div>

      <Switch
        fallback={
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <For each={data()!.drawGroups}>
              {(drawGroup) => <DrawGroupListItem drawGroup={drawGroup} />}
            </For>
          </div>
        }>
        <Match when={data.loading}>
          <div class="py-24">
            <SpinnerIcon class="animate-spin size-5 mx-auto" />
          </div>
        </Match>

        <Match when={data.error}>
          <Alert color="danger" isDismissible={false}>
            <FormattedMessage message={sharedMessages.somethingWentWrong} />
          </Alert>
        </Match>

        <Match when={!data() || !data()!.drawGroups || data()!.drawGroups.length === 0}>
          <div class="py-24 text-center">
            <p class="text-lg font-medium text-gray-600">
              <FormattedMessage message={messages.noDrawGroups} />
            </p>
          </div>
        </Match>
      </Switch>
    </UserLayout>
  );
};
