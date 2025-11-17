import { unitResultError } from '~/application/shared/models/UnitResult';
import { drawGroupManager } from './drawGroupManager';
import { drawGroupErrors } from '../drawGroupErrors';
import { Result, resultSuccess } from '~/application/shared/models/Result';

const createDrawGroup = (
  name: string,
  drawStartUtc: Date,
  drawEndUtc: Date,
  abortSignal: AbortSignal,
): Result<string> => {
  const year = drawStartUtc.getFullYear();

  const drawGroupWithNameAndYearAlreadyExists = drawGroupManager.existsWithNameAndYear(
    name,
    year,
    abortSignal,
  );

  if (drawGroupWithNameAndYearAlreadyExists) {
    return unitResultError(drawGroupErrors.alreadyExistsWithNameAndYear());
  }

  if (drawEndUtc < drawStartUtc) {
    return unitResultError(drawGroupErrors.invalidDrawPeriod());
  }

  const guid = drawGroupManager.createDrawGroup(name, drawStartUtc, drawEndUtc, abortSignal);

  return resultSuccess(guid);
};

export const createDrawGroupService = {
  createDrawGroup,
};
