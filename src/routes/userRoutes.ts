import express from 'express';
import Database from '../controllers/Database';
import Users from '../controllers/Users';
import grantAuthentication from '../middlewares/authHandler';

const route = express.Router();
const users: Users = new Users(Database.getInstance());

route.use(grantAuthentication);

route.get('/:userId', users.getUserById);
export default route;
