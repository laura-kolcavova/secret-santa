import { Component, Match, Switch } from 'solid-js';
import { ProfileForm } from './ProfileForm';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { Alert } from '../shared/Alert';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { sharedMessages } from '../shared/sharedMessages';
import { useParams } from '@solidjs/router';
import { messages } from './messages';
import { useProfileQuery } from './hooks/useProfileQuery';

export const MyProfile: Component = () => {
  const params = useParams();

  const [data] = useProfileQuery(params.email);

  return (
    <div class="container mx-auto py-12">
      <h1 class="text-2xl font-bold mb-8">
        <FormattedMessage message={messages.myProfile} />
      </h1>

      <Switch
        fallback={
          <Alert color="warning" isDismissible={false}>
            <FormattedMessage message={messages.profileNotFound} />
          </Alert>
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
        <Match when={data() !== null}>
          <ProfileForm profile={data()!} />
        </Match>
      </Switch>
    </div>
  );
};
