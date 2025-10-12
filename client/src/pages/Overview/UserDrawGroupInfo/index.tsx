import { Component, createSignal, Match, Show, Switch } from 'solid-js';
import { DrawGroupDto, UserStatusDto } from '~/api/drawGroups/dto/UserDrawGroupDto';
import { useLocalization } from '~/translation/useLocalization';
import { UserSolidIcon } from '~/pages/shared/icons/UserSolidIcon';
import { CalendarSolidIcon } from '~/pages/shared/icons/CalendarSolidIcon';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../messages';
import { JoinDrawGroupButton } from './JoinDrawGroupButton';
import { Countdown } from '~/pages/shared/Countdown';
import { DrawButton } from './DrawButton';
import { ExitIcon } from '~/pages/shared/icons/ExitIcon';
import { DrawnParticipantButton } from './DrawnParticipantButton';
import { useTimer } from './hooks/useTimer';

export type UserDrawGroupInfoProps = {
  drawGroup: DrawGroupDto;
  userStatus: UserStatusDto;
  refetchDrawGroup: () => void;
};

export const UserDrawGroupInfo: Component<UserDrawGroupInfoProps> = (props) => {
  const { drawGroup, userStatus, refetchDrawGroup } = props;

  const { formatDate } = useLocalization();

  const { getNowUtc } = useTimer();

  const drawHasStarted = (): boolean => {
    const nowUtc = getNowUtc();
    const drawStartUtc = new Date(drawGroup.drawStartUtc);
    const drawEndUtc = new Date(drawGroup.drawEndUtc);

    return nowUtc >= drawStartUtc && nowUtc <= drawEndUtc;
  };

  const drawHasEnded = (): boolean => {
    const nowUtc = getNowUtc();
    const drawEndUtc = new Date(drawGroup.drawEndUtc);

    return nowUtc > drawEndUtc;
  };

  const UserHasDrawnHandler: Component = () => {
    return (
      <>
        <div class="mb-4 text-base font-medium text-gray-600">
          <FormattedMessage message={messages.youHaveDrawn} />
        </div>

        <DrawnParticipantButton drawnParticipant={userStatus.drawnParticipant!} />
      </>
    );
  };

  const UserHasJoinedHandler: Component = () => {
    return (
      <Show
        when={drawHasStarted()}
        fallback={
          <Show
            when={drawHasEnded()}
            fallback={
              <div class="text-base font-medium text-gray-600">
                <FormattedMessage message={messages.waitForDrawToBegin} />
              </div>
            }>
            <div class="text-base font-medium text-gray-600">
              <FormattedMessage message={messages.drawHasEnded} />
            </div>
          </Show>
        }>
        <DrawButton drawGroup={drawGroup} refetchDrawGroup={refetchDrawGroup} />
      </Show>
    );
  };

  const UserHasNotJoinedHandler: Component = () => {
    return (
      <Show
        when={!drawHasEnded()}
        fallback={
          <div class="text-base font-medium text-gray-600">
            <FormattedMessage message={messages.drawHasEnded} />
          </div>
        }>
        <JoinDrawGroupButton drawGroup={drawGroup} refetchDrawGroup={refetchDrawGroup} />
      </Show>
    );
  };

  return (
    <div class="p-4 rounded shadow-md max-w-md min-w-md min-h-70 flex flex-col bg-white ">
      <div class="mb-2 text-lg font-bold text-center text-pallete-6">{drawGroup.name}</div>

      <div class="px-4 mb-8 flex items-center justify-between">
        <div class="text-base font-normal flex items-center text-gray-600">
          <UserSolidIcon class="size-4 mr-1.5" />
          {drawGroup.participantsCount} <FormattedMessage message={messages.participants} />
        </div>

        <div class="text-base font-normal flex items-center text-gray-600">
          <CalendarSolidIcon class="size-4 mr-1.5" />
          {formatDate(drawGroup.drawStartUtc)}
        </div>
      </div>

      <div class="flex-1 flex flex-col justify-center items-center mb-2">
        <Switch fallback={<UserHasNotJoinedHandler />}>
          <Match when={userStatus.hasDrawn}>
            <UserHasDrawnHandler />
          </Match>

          <Match when={userStatus.isParticipant}>
            <UserHasJoinedHandler />
          </Match>
        </Switch>
      </div>

      <div class="relative z-10">
        <div class="absolute bottom-1/2 left-2 translate-y-1/2 w-20 h-20 -rotate-12">
          <img
            src="/images/present.png"
            alt="present"
            draggable="false"
            class="w-full h-full object-contain pointer-events-none"
          />
        </div>

        <div class="absolute bottom-1/2 right-2 translate-y-1/2 w-20 h-20 rotate-64">
          <img
            src="/images/berries.png"
            alt="holly berries"
            draggable="false"
            class="w-full h-full object-contain pointer-events-none"
          />
        </div>

        <Countdown sourceDate={getNowUtc()} targetDate={new Date(drawGroup.drawStartUtc)} />
      </div>
    </div>
  );
};
