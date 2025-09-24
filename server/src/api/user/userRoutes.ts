import { Router } from 'express';
import { mapLogin } from './login/loginEndpoint';
import { mapNewProfile } from './newProfile/newProfileEndpoint';
import { mapGetProfile } from './getProfile/getProfileEndpoint';
import { mapEditProfile } from './editProfile/editProfileEndpoint';
import { mapChangePin } from './changePin/changePinEndpoint';
import { mapLogout } from './logout/logoutEndpoint';
import { mapGetLoggedUser } from './getLoggedUser/getLoggedUserEndpoint';

const router = Router();

mapLogin(router);
mapLogout(router);
mapGetLoggedUser(router);
mapNewProfile(router);
mapGetProfile(router);
mapEditProfile(router);
mapChangePin(router);

export default router;
