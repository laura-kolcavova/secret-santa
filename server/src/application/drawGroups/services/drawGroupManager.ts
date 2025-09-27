import { mockDraws } from '../mockDrawsGroups';
import { DrawGroup } from '../models/DrawGroup';

const getDrawGroupByYear = (year: number): DrawGroup | undefined => {
  const drawGroup = mockDraws.find((draw) => draw.year === year);

  if (drawGroup === undefined) {
    return undefined;
  }

  return { ...drawGroup };
};

export const drawGroupManager = {
  getDrawGroupByYear,
};
