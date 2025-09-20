import { Component, Match, Switch } from 'solid-js';
import { ProfileForm } from './ProfileForm';
import { useUserDetailQuery } from './hooks/userUserDetailQuery';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { Alert } from '../shared/Alert';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { sharedMessages } from '../shared/sharedMessages';
import { useParams } from '@solidjs/router';

export const MyProfile: Component = () => {
  const params = useParams();

  const [data] = useUserDetailQuery(params.email);

  return (
    <div class="container mx-auto py-12">
      <h1 class="text-2xl font-bold mb-8">Můj Profil</h1>

      <Switch fallback={<Alert color="warning">User not found</Alert>}>
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
