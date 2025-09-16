import { Router } from 'express';
import { handleLogin } from './login/loginEndpoint';

const router = Router();

router.post('/login', handleLogin);

export default router;
