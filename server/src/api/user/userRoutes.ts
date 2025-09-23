import { Router } from 'express';
import { mapLogin } from './login/loginEndpoint';
import { mapNewProfile } from './newProfile/newProfileEndpoint';
import { mapGetProfile } from './getProfile/getProfileEndpoint';
import { mapEditProfile } from './editProfile/editProfileEndpoint';
import { mapChangePin } from './changePin/changePinEndpoint';

const router = Router();

mapLogin(router);
mapNewProfile(router);
mapGetProfile(router);
mapEditProfile(router);
mapChangePin(router);

export default router;
