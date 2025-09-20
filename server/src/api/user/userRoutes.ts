import { Router } from 'express';
import { LOGIN_PATH, handleLogin } from './login/loginEndpoint';
import { NEW_PROFILE_PATH, handleNewProfile } from './newProfile/newProfileEndpoint';
import { GET_USER_DETAIL_PATH, handleGetUserDetail } from './getUserDetail/getDetailEndpoint';

const router = Router();

router.post(LOGIN_PATH, handleLogin);
router.post(NEW_PROFILE_PATH, handleNewProfile);
router.get(GET_USER_DETAIL_PATH, handleGetUserDetail);

export default router;
