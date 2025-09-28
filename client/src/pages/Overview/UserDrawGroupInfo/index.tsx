import { Component, Show } from 'solid-js';
import { DrawGroupDto, UserStatusDto } from '~/api/drawGroups/dto/UserDrawGroupDto';
import { useLocalization } from '~/translation/useLocalization';
import { UserSolidIcon } from '~/pages/shared/icons/UserSolidIcon';
import { CalendarSolidIcon } from '~/pages/shared/icons/CalendarSolidIcon';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../messages';
import { JoinDrawGroupButton } from './JoinDrawGroupButton';

export type UserDrawGroupInfoProps = {
  drawGroup: DrawGroupDto;
  userStatus: UserStatusDto;
  refetchDrawGroup: () => void;
};

export const UserDrawGroupInfo: Component<UserDrawGroupInfoProps> = (props) => {
  const { formatDate } = useLocalization();

  const { drawGroup, userStatus, refetchDrawGroup } = props;

  const canJoin = (): boolean => {
    if (userStatus.isParticipant) {
      return false;
    }

    return true;

    // const nowLocal = new Date();
    // const drawStartLocal = new Date(drawStartUtc);

    // return nowLocal < drawStartLocal;
  };

  const canDraw = (): boolean => {
    if (!userStatus.isParticipant) {
      return false;
    }

    if (userStatus.hasDrawn) {
      return false;
    }

    const nowLocal = new Date();
    const drawStartLocal = new Date(drawGroup.drawStartUtc);
    const drawEndLocal = new Date(drawGroup.drawEndUtc);

    return nowLocal >= drawStartLocal && nowLocal <= drawEndLocal;
  };

  const draw = (): void => {};

  return (
    <div class="p-4 bg-white rounded shadow-md max-w-md">
      <div class="mb-2 text-lg font-bold text-center text-pallete-6">{drawGroup.name}</div>

      <div class="px-4 mb-10 flex items-center justify-between">
        <div class="text-base font-normal flex items-center text-gray-600 ">
          <UserSolidIcon class="size-4 mr-1.5" />
          {drawGroup.participantsCount} <FormattedMessage message={messages.participants} />
        </div>

        <div class="text-base font-normal flex items-center text-gray-600 ">
          <CalendarSolidIcon class="size-4 mr-1.5" />
          {formatDate(drawGroup.drawStartUtc)}
        </div>
      </div>

      <div class="flex justify-center">
        <Show
          when={userStatus.isParticipant}
          fallback={
            <Show
              when={canJoin()}
              fallback={
                <div class="text-base font-medium text-red-600">
                  <FormattedMessage message={messages.cantJoinDrawAlreadyBegan} />
                </div>
              }>
              <JoinDrawGroupButton
                drawGroupGuid={drawGroup.guid}
                refetchDrawGroup={refetchDrawGroup}
              />
            </Show>
          }>
          <Show
            when={userStatus.hasDrawn}
            fallback={
              <Show
                when={canDraw()}
                fallback={
                  <div class="text-base font-medium text-gray-600">
                    <FormattedMessage message={messages.waitForDrawToBegin} />
                  </div>
                }>
                <button
                  class="w-1/2 py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline cursor-pointer flex items-center justify-center bg-pallete-4 hover:bg-pallete-5 text-pallete-8"
                  onClick={draw}>
                  <FormattedMessage message={messages.draw} />
                </button>
              </Show>
            }>
            <div class="mt-2 p-2 bg-green-50 rounded border border-green-200">
              <div class="font-medium text-green-700">You have drawn:</div>
              <div class="text-green-800">{userStatus.drawnParticipant!.fullName}</div>
            </div>
          </Show>
        </Show>
      </div>
    </div>
  );
};
