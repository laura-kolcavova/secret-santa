import { Component, For, Match, Switch } from 'solid-js';
import { UserLayout } from '../shared/UserLayout';
import { useDrawGroupListQuery } from './hooks/useDrawGroupListQuery';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { Alert } from '../shared/Alert';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { sharedMessages } from '../shared/sharedMessages';
import { DrawGroupListItem } from './DrawGroupListItem';
import { messages } from './messages';

export const DrawGroups: Component = () => {
  const [data] = useDrawGroupListQuery();

  return (
    <UserLayout>
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
