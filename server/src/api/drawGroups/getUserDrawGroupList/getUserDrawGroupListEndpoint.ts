import { Request, Response, NextFunction, Router } from 'express';
import { userAuthorizationHandler } from '~/api/shared/middlewares/userAuthorizatoinHandler';
import { drawGroupManager } from '~/application/drawGroups/services/drawGroupManager';
import { DrawnParticipantDto, UserDrawGroupListItemDto } from './UserDrawGroupListItemDto';
import { userManager } from '~/application/user/services/userManager';
import { userErrors } from '~/application/user/userErrors';
import { createProblemDetails } from '~/api/shared/utils/validationErrorHelper';
import { getFullName } from '~/application/user/models/User';
import { DrawGroup, findParticipantByEmail } from '~/application/drawGroups/models/DrawGroup';
import { Result, resultError, resultSuccess } from '~/application/shared/models/Result';
import { UserDrawGroupListDto } from './UserDrawGroupListDto';

export const mapGetUserDrawGroupList = (router: Router) => {
  router.get('/user-list', userAuthorizationHandler, handle);
};

const handle = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { abortSignal, loggedUser } = req;

    const userDrawGroupListDtoResult = getUserDrawGroupListOfThisYear(
      loggedUser!.email,
      abortSignal,
    );

    if (!userDrawGroupListDtoResult.isSuccess) {
      const problemDetails = createProblemDetails(userDrawGroupListDtoResult.error!, req);

      res.status(400).json(problemDetails);
    }

    const userDrawGroupListDto = userDrawGroupListDtoResult.value!;

    if (userDrawGroupListDto.userDrawGroups.length === 0) {
      res.status(204).send();

      return;
    }

    res.status(200).json(userDrawGroupListDto);
  } catch (error) {
    next(error);
  }
};

const getUserDrawGroupListOfThisYear = (
  email: string,
  abortSignal: AbortSignal,
): Result<UserDrawGroupListDto> => {
  const currentYear = new Date().getFullYear();

  const drawGroups = drawGroupManager.getAllByYear(currentYear, abortSignal);

  const userDrawGroupListItemDtos: UserDrawGroupListItemDto[] = [];

  for (var drawGroup of drawGroups) {
    const drawGroupListItemDtoResult = createUserDrawGroup(drawGroup, email, abortSignal);

    if (!drawGroupListItemDtoResult.isSuccess) {
      return resultError(drawGroupListItemDtoResult.error!);
    }

    const userDrawGroupListItemDto = drawGroupListItemDtoResult.value!;

    userDrawGroupListItemDtos.push(userDrawGroupListItemDto);
  }

  const userDrawGroupListDto: UserDrawGroupListDto = {
    userDrawGroups: userDrawGroupListItemDtos,
  };

  return resultSuccess(userDrawGroupListDto);
};

const createUserDrawGroup = (
  drawGroup: DrawGroup,
  email: string,
  abortSignal: AbortSignal,
): Result<UserDrawGroupListItemDto> => {
  const participant = findParticipantByEmail(drawGroup, email);

  let drawnParticipantDto: DrawnParticipantDto | undefined = undefined;

  if (participant && participant.drawnParticipant) {
    const drawnParticipantAsUser = userManager.findByEmail(
      participant.drawnParticipant.email,
      abortSignal,
    );

    if (!drawnParticipantAsUser) {
      return resultError(userErrors.notFound());
    }

    drawnParticipantDto = {
      email: participant.drawnParticipant.email,
      fullName: getFullName(drawnParticipantAsUser),
      department: drawnParticipantAsUser.department,
      hobbies: [...drawnParticipantAsUser.hobbies],
    };
  }

  const userDrawGroupListItemDto: UserDrawGroupListItemDto = {
    drawGroup: {
      guid: drawGroup.guid,
      name: drawGroup.name,
      participantsCount: drawGroup.participants.length,
      drawStartUtc: drawGroup.drawStartUtc.toISOString(),
      drawEndUtc: drawGroup.drawEndUtc.toISOString(),
    },
    userStatus: {
      isParticipant: participant !== undefined,
      hasDrawn: participant?.hasDrawn ?? false,
      drawnParticipant: drawnParticipantDto,
    },
  };

  return resultSuccess(userDrawGroupListItemDto);
};
