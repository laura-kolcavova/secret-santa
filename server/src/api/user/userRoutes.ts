import { Router } from 'express';
import { handleLogin } from './login/loginEndpoint';
import { handleNewProfile } from './newProfile/newProfileEndpoint';

const router = Router();

router.post('/login', handleLogin);
router.post('/new-profile', handleNewProfile);

export default router;
