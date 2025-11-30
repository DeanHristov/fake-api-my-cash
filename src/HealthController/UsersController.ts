import { NextFunction, Request, Response as ExpressResponse } from 'express';
import { IUser } from '../types';
import Utils from '../utils/Utils';
import Response from '../utils/Response';
import ErrorResponse from '../utils/ErrorResponse';
import { STATUS_CODE } from '../utils/statusCodes';
import usersService from '../services/UsersService';

const getUserByIdHandler = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction,
) => {
  const { userId } = req.params;
  const selectedUser: IUser | null = await usersService.getById(userId);

  if (Utils.isNotEmpty(selectedUser)) {
    return res.json(new Response<IUser>('ok', selectedUser!));
  }

  throw new ErrorResponse(
    `Error! Resource is not found!`,
    STATUS_CODE.NOT_FOUND,
  );
};

export { getUserByIdHandler };
