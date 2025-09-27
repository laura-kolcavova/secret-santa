import { Component, Show } from 'solid-js';
import { UserDrawGroupDto } from '~/api/drawGroups/dto/UserDrawGroupDto';
import { useLocalization } from '~/translation/useLocalization';
import { UserSolidIcon } from '~/pages/shared/icons/UserSolidIcon';
import { CalendarSolidIcon } from '~/pages/shared/icons/CalendarSolidIcon';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../messages';

export type UserDrawGroupInfoProps = {
  userDrawGroup: UserDrawGroupDto;
};

export const UserDrawGroupInfo: Component<UserDrawGroupInfoProps> = (props) => {
  const { formatDate } = useLocalization();

  const { name, participantsCount, drawStartUtc, drawEndUtc, didUserJoined, drawnUser } =
    props.userDrawGroup;

  const canJoin = (): boolean => {
    if (didUserJoined) {
      return false;
    }

    const nowLocal = new Date();
    const drawStartLocal = new Date(drawStartUtc);

    return nowLocal < drawStartLocal;
  };

  const canDraw = (): boolean => {
    if (!didUserJoined) {
      return false;
    }

    if (drawnUser) {
      return false;
    }

    const nowLocal = new Date();
    const drawStartLocal = new Date(drawStartUtc);
    const drawEndLocal = new Date(drawEndUtc);

    return nowLocal >= drawStartLocal && nowLocal <= drawEndLocal;
  };

  const joinDrawGroup = (): void => {};

  const draw = (): void => {};

  return (
    <div class="p-4 bg-white rounded shadow-md max-w-md">
      <div class="mb-2 text-lg font-bold text-center text-pallete-6">{name}</div>

      <div class="px-4 mb-10 flex items-center justify-between">
        <div class="text-gray-600 text-md flex items-center">
          <UserSolidIcon class="size-4 mr-1.5" />
          {participantsCount} <FormattedMessage message={messages.participants} />
        </div>

        <div class="text-gray-600 text-md flex items-center">
          <CalendarSolidIcon class="size-4 mr-1.5" />
          {formatDate(drawStartUtc)}
        </div>
      </div>

      <Show
        when={didUserJoined}
        fallback={
          <Show
            when={canJoin()}
            fallback={
              <div class="text-center text-red-600 font-medium mb-4">
                You can't join because the draw has already begun.
              </div>
            }>
            <div class="flex justify-center">
              <button
                class="w-1/2 py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
                onClick={joinDrawGroup}>
                <FormattedMessage message={messages.joinDraw} />
              </button>
            </div>
          </Show>
        }>
        <Show
          when={drawnUser}
          fallback={
            <Show when={canDraw()} fallback={<div>You are in! Wait for the draw to begin</div>}>
              <button
                class="w-1/2 py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
                onClick={draw}>
                <FormattedMessage message={messages.draw} />
              </button>
            </Show>
          }>
          <div class="mt-2 p-2 bg-green-50 rounded border border-green-200">
            <div class="font-medium text-green-700">You have drawn:</div>
            <div class="text-green-800">{drawnUser!.fullName}</div>
          </div>
        </Show>
      </Show>
    </div>
  );
};
