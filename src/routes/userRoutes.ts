import express from 'express';
import { getUserByIdHandler } from '../controllers/UsersController';
import authenticationGuardMiddleware from '../middlewares/authenticationGuardMiddleware';

const route = express.Router();

route.use(authenticationGuardMiddleware);

route.get('/:userId', getUserByIdHandler);
export default route;
