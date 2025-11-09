import { Component, Match, Switch } from 'solid-js';
import { useParams, useNavigate } from '@solidjs/router';
import { UserLayout } from '../shared/UserLayout';
import { useDrawGroupDetailQuery } from './hooks/useDrawGroupDetailQuery';
import { Alert } from '../shared/Alert';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { sharedMessages } from '../shared/sharedMessages';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { DrawGroupInfo } from './DrawGroupInfo';
import { ParticipantsList } from './ParticipantsList';
import { messages } from './messages';
import { pages } from '~/navigation/pages';

export const DrawGroupDetail: Component = () => {
  const params = useParams<{ guid: string }>();

  const navigate = useNavigate();

  const [data] = useDrawGroupDetailQuery(params.guid);

  const goBack = () => {
    navigate(pages.DrawGroups.paths[0]);
  };

  return (
    <UserLayout>
      <div class="mb-4">
        <button
          onClick={goBack}
          class="px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:shadow-outline cursor-pointer text-pallete-8 bg-pallete-4 hover:bg-pallete-5 ">
          ← <FormattedMessage message={sharedMessages.back} />
        </button>
      </div>

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
