import { Component, Match, Switch } from 'solid-js';
import { useParams } from '@solidjs/router';
import { UserLayout } from '../shared/UserLayout';
import { useDrawGroupDetailQuery } from './hooks/useDrawGroupDetailQuery';
import { Alert } from '../shared/Alert';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { sharedMessages } from '../shared/sharedMessages';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { DrawGroupInfo } from './DrawGroupInfo';
import { ParticipantsList } from './ParticipantsList';
import { messages } from './messages';
import { HeaderButtons } from './HeaderButtons';

export const DrawGroupDetail: Component = () => {
  const params = useParams<{ guid: string }>();

  const [data, { refetch }] = useDrawGroupDetailQuery(params.guid);

  return (
    <UserLayout>
      <HeaderButtons drawGroup={data()} refetch={refetch} />

      <Switch
        fallback={
          <>
            <DrawGroupInfo drawGroup={data()!} />

            <ParticipantsList participants={data()!.participants} />
          </>
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

        <Match when={!data()}>
          <Alert color="warning" isDismissible={false}>
            <FormattedMessage message={messages.drawGroupNotFound} />
          </Alert>
        </Match>
      </Switch>
    </UserLayout>
  );
};
