import { Component } from 'solid-js';
import { DrawGroupDetailDto } from '~/api/drawGroups/dto/DrawGroupDetailDto';
import { useLocalization } from '~/translation/useLocalization';
import { FormattedMessage } from '~/translation/FormattedMessage';
import { messages } from '../messages';
import { getDrawStatus } from '../utils/drawStatus';

export type DrawGroupInfoProps = {
  drawGroup: DrawGroupDetailDto;
};

export const DrawGroupInfo: Component<DrawGroupInfoProps> = (props) => {
  const { formatDate, formatTime } = useLocalization();

  const drawStatus = getDrawStatus(props.drawGroup);

  return (
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <div class="flex items-center gap-3 mb-6">
        <h1 class="text-2xl font-bold text-pallete-6 truncate flex-1" title={props.drawGroup.name}>
          {props.drawGroup.name}
        </h1>

        <span
          class={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${drawStatus.class}`}>
          <FormattedMessage message={drawStatus.message} />
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col">
          <span class="text-sm font-semibold text-gray-500">
            <FormattedMessage message={messages.year} />
          </span>
          <span class="text-lg text-pallete-6">{props.drawGroup.year}</span>
        </div>

        <div class="flex flex-col">
          <span class="text-sm font-semibold text-gray-500">
            <FormattedMessage message={messages.participants} />
          </span>
          <span class="text-lg text-pallete-6">{props.drawGroup.participants.length}</span>
        </div>

        <div class="flex flex-col">
          <span class="text-sm font-semibold text-gray-500">
            <FormattedMessage message={messages.drawStarts} />
          </span>
          <span class="text-lg text-pallete-6">
            {formatDate(props.drawGroup.drawStartUtc)}{' '}
            {formatTime(props.drawGroup.drawStartUtc, {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        <div class="flex flex-col">
          <span class="text-sm font-semibold text-gray-500">
            <FormattedMessage message={messages.drawEnds} />
          </span>
          <span class="text-lg text-pallete-6">
            {formatDate(props.drawGroup.drawEndUtc)}{' '}
            {formatTime(props.drawGroup.drawEndUtc, {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        <div class="flex flex-col">
          <span class="text-sm font-semibold text-gray-500 ">
            <FormattedMessage message={messages.createdAt} />
          </span>
          <span class="text-lg text-pallete-6">
            {formatDate(props.drawGroup.createdAtUtc)}{' '}
            {formatTime(props.drawGroup.drawStartUtc, {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
