import express from 'express';
import { healthCheck } from '../controllers/HealthController';

const router = express.Router();

router.get('/', healthCheck);
export default router;
