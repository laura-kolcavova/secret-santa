import { DrawGroupDetailDto } from '~/api/drawGroups/dto/DrawGroupDetailDto';
import { messages } from '../messages';

export const drawHasStarted = (drawGroup: DrawGroupDetailDto): boolean => {
  const nowUtc = new Date();
  const drawStartUtc = new Date(drawGroup.drawStartUtc);
  const drawEndUtc = new Date(drawGroup.drawEndUtc);

  return nowUtc >= drawStartUtc && nowUtc <= drawEndUtc;
};

export const drawHasEnded = (drawGroup: DrawGroupDetailDto): boolean => {
  const nowUtc = new Date();
  const drawEndUtc = new Date(drawGroup.drawEndUtc);

  return nowUtc > drawEndUtc;
};

export const getDrawStatus = (drawGroup: DrawGroupDetailDto) => {
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
