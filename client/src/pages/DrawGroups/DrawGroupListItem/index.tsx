import { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { DrawGroupListItemDto } from '~/api/drawGroups/dto/DrawGroupListDto';
import { useLocalization } from '~/translation/useLocalization';
import { UserSolidIcon } from '~/pages/shared/icons/UserSolidIcon';
import { CalendarSolidIcon } from '~/pages/shared/icons/CalendarSolidIcon';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../messages';
import { pages } from '~/navigation/pages';

export type DrawGroupListItemProps = {
  drawGroup: DrawGroupListItemDto;
};

export const DrawGroupListItem: Component<DrawGroupListItemProps> = (props) => {
  const { formatDate } = useLocalization();

  const drawGroupDetailPath = pages.DrawGroupDetail.paths[0].replace(':guid', props.drawGroup.guid);

  return (
    <A
      href={drawGroupDetailPath}
      class="block p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-100 hover:border-pallete-5">
      <div class="mb-4">
        <h3 class="text-xl font-bold text-center text-pallete-6">{props.drawGroup.name}</h3>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex items-center text-gray-600">
          <UserSolidIcon class="size-4 mr-1.5" />
          <span class="text-sm">
            {props.drawGroup.participantsCount} <FormattedMessage message={messages.participants} />
          </span>
        </div>

        <div class="flex items-center text-gray-600">
          <CalendarSolidIcon class="size-4 mr-1.5" />
          <span class="text-sm">
            <FormattedMessage message={messages.drawStarts} />:{' '}
            {formatDate(props.drawGroup.drawStartUtc)}
          </span>
        </div>

        <div class="flex items-center text-gray-600">
          <CalendarSolidIcon class="size-4 mr-1.5" />
          <span class="text-sm">
            <FormattedMessage message={messages.drawEnds} />:{' '}
            {formatDate(props.drawGroup.drawEndUtc)}
          </span>
        </div>
      </div>
    </A>
  );
};
