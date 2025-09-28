import { Component, Match, Switch } from 'solid-js';

import { UserLayout } from '../shared/UserLayout';
import { useUserDrawGroupQuery } from './hooks/useUserDrawGroupQuery';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { Alert } from '../shared/Alert';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { sharedMessages } from '../shared/sharedMessages';
import { messages } from './messages';
import { UserDrawGroupInfo } from './UserDrawGroupInfo';

export const Overview: Component = () => {
  const [data, { refetch }] = useUserDrawGroupQuery();

  const refetchDrawGroup = () => {
    refetch();
  };

  return (
    <UserLayout>
      <Switch>
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
        <Match when={!data()}>
          <Alert color="warning" isDismissible={false}>
            <FormattedMessage message={messages.drawInThisYearNotStartedYet} />
          </Alert>
        </Match>
        <Match when={data()}>
          <UserDrawGroupInfo userDrawGroup={data()!} refetchDrawGroup={refetchDrawGroup} />
        </Match>
      </Switch>
    </UserLayout>
  );
};
