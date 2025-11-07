import { Component, For, Match, Switch } from 'solid-js';

import { UserLayout } from '../shared/UserLayout';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { Alert } from '../shared/Alert';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { sharedMessages } from '../shared/sharedMessages';
import { messages } from './messages';
import { UserDrawGroupInfo } from './UserDrawGroupInfo';
import { useUserDrawGroupListQuery } from './hooks/useUserDrawGroupListQuery';

export const Overview: Component = () => {
  const [data, { refetch }] = useUserDrawGroupListQuery();

  const refetchDrawGroup = () => {
    refetch();
  };

  return (
    <UserLayout>
      <Switch
        fallback={
          <For each={data()!.userDrawGroups}>
            {(userDrawGroup) => (
              <UserDrawGroupInfo
                drawGroup={userDrawGroup.drawGroup}
                userStatus={userDrawGroup.userStatus}
                refetchDrawGroup={refetchDrawGroup}
              />
            )}
          </For>
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

        <Match when={!data() || !data()!.userDrawGroups}>
          <Alert color="warning" isDismissible={false}>
            <FormattedMessage message={messages.drawInThisYearNotStartedYet} />
          </Alert>
        </Match>
      </Switch>
    </UserLayout>
  );
};
