import {
  UnitResult,
  unitResultError,
  unitResultSuccess,
} from '~/application/shared/models/UnitResult';
import { drawGroupManager } from './drawGroupManager';
import { drawGroupErrors } from '../drawGroupErrors';
import { drawHasEnded, drawHasStarted, hasParticipantByEmail } from '../models/DrawGroup';

const deleteDrawGroup = (drawGroupGuid: string, abortSignal: AbortSignal): UnitResult => {
  const drawGroup = drawGroupManager.findByGuid(drawGroupGuid, abortSignal);

  if (!drawGroup) {
    return unitResultError(drawGroupErrors.notFound());
  }

  drawGroupManager.deleteDrawGroup(drawGroup, abortSignal);

  return unitResultSuccess();
};

export const deleteDrawGroupService = {
  deleteDrawGroup,
};
