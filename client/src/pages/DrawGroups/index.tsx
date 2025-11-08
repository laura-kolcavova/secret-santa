import { Component, For, Match, Switch } from 'solid-js';
import { UserLayout } from '../shared/UserLayout';
import { useDrawGroupListQuery } from './hooks/useDrawGroupListQuery';
import { SpinnerIcon } from '../shared/icons/SpinnerIcon';
import { Alert } from '../shared/Alert';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { sharedMessages } from '../shared/sharedMessages';

export const DrawGroups: Component = () => {
  const [data] = useDrawGroupListQuery();

  return (
    <UserLayout>
      <Switch fallback={<For each={data()!.drawGroups}>{(drawGroup) => drawGroup}</For>}>
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

        <Match when={!data() || !data()!.drawGroups}>
          <></>
        </Match>
      </Switch>
    </UserLayout>
  );
};
