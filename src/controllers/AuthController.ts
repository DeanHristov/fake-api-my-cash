import { NextFunction, Request, Response as ExpressResponse } from 'express';
import Utils from '../utils/Utils';
import ErrorResponse from '../utils/ErrorResponse';
import { STATUS_CODE } from '../utils/statusCodes';
import { compareSync } from 'bcryptjs';
import usersService, { IUser } from '../services/UsersService';

const singIn = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  const selectedUser: IUser | null = await usersService.getByEmail(email || '');

  if (Utils.isEmpty(selectedUser)) {
    throw new ErrorResponse(
      'Error! Wrong username or password',
      STATUS_CODE.NOT_FOUND,
    );
  }

  if (!compareSync(password || '', selectedUser!.password)) {
    throw new ErrorResponse(
      'Error! Wrong username or password',
      STATUS_CODE.NOT_FOUND,
    );
  }

  res.locals.user = selectedUser;
  next();
};

const singUp = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
) => {
  //TODO Implement it!
  throw new Error('Method not implemented.');
};

const singOut = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
) => {
  //TODO Implement it!
  throw new Error('Method not implemented.');
};

export { singIn, singUp, singOut };
