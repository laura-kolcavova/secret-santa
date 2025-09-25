import { Component, Match, Switch } from 'solid-js';
import { ProfileForm } from './ProfileForm';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { Alert } from '../shared/Alert';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { sharedMessages } from '../shared/sharedMessages';
import { messages } from './messages';
import { useProfileQuery } from './hooks/useProfileQuery';
import { UserLayout } from '../shared/UserLayout';

export const MyProfile: Component = () => {
  const [data] = useProfileQuery();

  return (
    <UserLayout>
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
        <Match when={data()}>
          <ProfileForm profile={data()!} />
        </Match>
      </Switch>
    </UserLayout>
  );
};
