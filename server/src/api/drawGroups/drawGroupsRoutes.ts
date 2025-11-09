import { Application, Router } from 'express';
import { mapJoinDrawGroup } from './joinDrawGroup/joinDrawGroupEndpoint';
import { mapDrawParticipant } from './drawParticipant/drawParticipantEndpoint';
import { mapGetUserDrawGroupList } from './getUserDrawGroupList/getUserDrawGroupListEndpoint';
import { mapGetDrawGroupList } from './getDrawGroupList/getDrawGroupListEndpoint';
import { mapGetDrawGroupDetail } from './getDrawGroupDetail/getDrawGroupDetailEndpoint';

export const mapDrawGroupsRoutes = (app: Application) => {
  const router = Router();

  mapGetUserDrawGroupList(router);
  mapGetDrawGroupList(router);
  mapGetDrawGroupDetail(router);
  mapJoinDrawGroup(router);
  mapDrawParticipant(router);

  app.use('/api/draw-groups', router);
};
