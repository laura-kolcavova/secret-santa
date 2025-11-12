import { messages } from '../messages';
import { DrawGroupListItemDto } from '~/api/drawGroups/dto/DrawGroupListDto';

export const drawHasStarted = (drawGroup: DrawGroupListItemDto): boolean => {
  const nowUtc = new Date(Date.now());
  const drawStartUtc = new Date(drawGroup.drawStartUtc);
  const drawEndUtc = new Date(drawGroup.drawEndUtc);

  return nowUtc >= drawStartUtc && nowUtc <= drawEndUtc;
};

export const drawHasEnded = (drawGroup: DrawGroupListItemDto): boolean => {
  const nowUtc = new Date(Date.now());
  const drawEndUtc = new Date(drawGroup.drawEndUtc);

  return nowUtc > drawEndUtc;
};

export const getDrawStatus = (drawGroup: DrawGroupListItemDto) => {
  if (drawHasEnded(drawGroup)) {
    return {
      message: messages.statusDrawEnded,
      class: 'bg-red-100 text-red-800',
    };
  }
  if (drawHasStarted(drawGroup)) {
    return {
      message: messages.statusDrawInProgress,
      class: 'bg-green-100 text-green-800',
    };
  }
  return {
    message: messages.statusDrawNotStarted,
    class: 'bg-gray-100 text-gray-800',
  };
};
