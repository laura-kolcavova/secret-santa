import {
  UnitResult,
  unitResultError,
  unitResultSuccess,
} from '~/application/shared/models/UnitResult';
import { drawGroupManager } from './drawGroupManager';
import { drawGroupErrors } from '../drawGroupErrors';

const editDrawGroup = (
  drawGroupGuid: string,
  name: string,
  drawStartUtc: Date,
  drawEndUtc: Date,
  abortSignal: AbortSignal,
): UnitResult => {
  const drawGroup = drawGroupManager.findByGuid(drawGroupGuid, abortSignal);

  if (!drawGroup) {
    return unitResultError(drawGroupErrors.notFound());
  }

  return unitResultSuccess();
};

export const editDrawGroupService = {
  editDrawGroup,
};
