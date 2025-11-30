import express from 'express';
import { healthCheck } from '../HealthController/HealthController';

const router = express.Router();

router.get('/', healthCheck);
export default router;
