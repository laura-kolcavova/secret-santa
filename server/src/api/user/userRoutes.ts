import { Router } from 'express';
import { mapLogin } from './login/loginEndpoint';
import { mapNewProfile } from './newProfile/newProfileEndpoint';
import { mapGetProfile } from './getProfile/getProfileEndpoint';
import { mapEditProfile } from './editProfile/editProfileEndpoint';

const router = Router();

mapLogin(router);
mapNewProfile(router);
mapGetProfile(router);
mapEditProfile(router);

export default router;
