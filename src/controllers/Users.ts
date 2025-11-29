import Database from './Database';
import { IUser } from '../types';
import { NextFunction, Request, Response as ExpressResponse } from 'express';
import Utils from '../utils/Utils';
import ErrorResponse from '../utils/ErrorResponse';
import Response from '../utils/Response';
import { STATUS_CODE } from '../utils/statusCodes';

class Users {
  constructor(private readonly db: Database) {}

  // Getting single user from DB by userId
  public getUserById = async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction,
  ) => {
    const { userId } = req.params;

    const [rows] = await this.db.execute<IUser[]>(
      'SELECT * FROM `users` WHERE `id` = ?',
      [userId],
    );

    if (Utils.isNotEmpty(rows)) {
      return res.json(new Response<IUser>('ok', rows[0]));
    }

    throw new ErrorResponse(
      `Error! The resource is not found!`,
      STATUS_CODE.NOT_FOUND,
    );
  };

  // Pulling all users from DB
  public getAllUsers = async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction,
  ) => {
    const [rows] = await this.db.query<IUser[]>('SELECT * FROM `users`');

    if (Utils.isNotEmpty(rows)) {
      return res.json(new Response<IUser[]>('ok', rows));
    }

    throw new ErrorResponse(
      `Error! The resource is not found!`,
      STATUS_CODE.NOT_FOUND,
    );
  };
}

export default Users;
