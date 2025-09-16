import { Router } from 'express';
import { login } from './login/loginEndpoint';

const router = Router();

router.post('/login', login);

export default router;
