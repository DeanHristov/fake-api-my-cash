import express from 'express';
import assignTokenMiddleware from '../middlewares/assignTokenMiddleware';
import { singIn, singOut, singUp } from '../controllers/AuthController';

const route = express.Router();

route.get('/sign-out', singOut);

route.post('/sign-in', singIn, assignTokenMiddleware);

route.post('/sign-up', singUp);

export default route;
