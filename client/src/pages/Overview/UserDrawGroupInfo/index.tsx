import { Component, Match, Switch } from 'solid-js';
import { useLocalization } from '~/translation/useLocalization';
import { UserSolidIcon } from '~/pages/shared/icons/UserSolidIcon';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../messages';
import { JoinDrawGroupButton } from './JoinDrawGroupButton';
import { Countdown } from '~/pages/shared/Countdown';
import { DrawButton } from './DrawButton';
import { DrawnParticipantButton } from './DrawnParticipantButton';
import { useTimer } from './hooks/useTimer';
import { DrawGroupDto, UserStatusDto } from '~/api/drawGroups/dto/UserDrawGroupListDto';

export type UserDrawGroupInfoProps = {
  drawGroup: DrawGroupDto;
  userStatus: UserStatusDto;
  refetchDrawGroup: () => void;
};

export const UserDrawGroupInfo: Component<UserDrawGroupInfoProps> = (props) => {
  const { drawGroup, userStatus, refetchDrawGroup } = props;

  const { formatDate, formatTime } = useLocalization();

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
        <div class="mb-2 text-base font-medium text-gray-600">
          <FormattedMessage message={messages.youHaveDrawn} />
        </div>

        <DrawnParticipantButton drawnParticipant={userStatus.drawnParticipant!} />
      </>
    );
  };

  const UserHasJoinedHandler: Component = () => {
    return (
      <Switch fallback={<DrawButton drawGroup={drawGroup} refetchDrawGroup={refetchDrawGroup} />}>
        <Match when={drawHasEnded()}>
          <div class="text-base font-medium text-gray-600">
            <FormattedMessage message={messages.drawHasEnded} />
          </div>
        </Match>

        <Match when={!drawHasStarted()}>
          <div class="text-base font-medium text-gray-600">
            <FormattedMessage message={messages.waitForDrawToBegin} />
          </div>
        </Match>
      </Switch>
    );
  };

  const UserHasNotJoinedHandler: Component = () => {
    return (
      <Switch
        fallback={
          <JoinDrawGroupButton drawGroup={drawGroup} refetchDrawGroup={refetchDrawGroup} />
        }>
        <Match when={drawHasEnded()}>
          <div class="text-base font-medium text-gray-600">
            <FormattedMessage message={messages.drawHasEnded} />
          </div>
        </Match>

        <Match when={drawHasStarted()}>
          <div class="text-base font-medium text-gray-600">
            <FormattedMessage message={messages.cantJoinDrawAlreadyBegan} />
          </div>
        </Match>
      </Switch>
    );
  };

  return (
    <div class="p-4 px-6 rounded-lg shadow-md max-w-md min-w-md min-h-70 flex flex-col bg-white hover:shadow-lg transition-shadow duration-200 border border-gray-100 hover:border-pallete-5">
      <div class="mb-10 flex items-center justify-between">
        <div class="text-lg font-bold  text-pallete-6">{drawGroup.name}</div>

        <div class="text-base font-normal flex items-center text-gray-600">
          <UserSolidIcon class="size-4 mr-1.5" />
          {drawGroup.participantsCount}
        </div>
      </div>

      <div class="flex-1 flex flex-col justify-center items-center mb-10">
        <Switch fallback={<UserHasNotJoinedHandler />}>
          <Match when={userStatus.hasDrawn}>
            <UserHasDrawnHandler />
          </Match>

          <Match when={userStatus.isParticipant}>
            <UserHasJoinedHandler />
          </Match>
        </Switch>
      </div>

      <div class="flex flex-col items-center relative z-10 ">
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

        <span class="text-base font-normal text-gray-600">
          <FormattedMessage message={messages.drawStartsIn} />
        </span>

        <Countdown sourceDate={getNowUtc()} targetDate={new Date(drawGroup.drawStartUtc)} />

        <span class="mt-1 text-sm font-normal text-gray-600">
          {formatDate(drawGroup.drawStartUtc)}{' '}
          {formatTime(drawGroup.drawStartUtc, {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
};
