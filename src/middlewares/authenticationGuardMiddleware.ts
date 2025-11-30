import { NextFunction, Request, Response as ExpressResponse } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Utils from '../utils/Utils';
import ErrorResponse from '../utils/ErrorResponse';
import { STATUS_CODE } from '../utils/statusCodes';
import authService from '../services/AuthService';

const authenticationGuardMiddleware = async (
  req: Request,
  _: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { authorization } = req.headers;
  let { token } = req.cookies;

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  if (Utils.isNull(token)) {
    throw new ErrorResponse(
      'Error! Authentication is required!',
      STATUS_CODE.UNAUTHORIZED,
    );
  }

  const decodedToken = authService.decodeJWToken<JwtPayload>(token);

  if (Utils.isNull(decodedToken)) {
    throw new ErrorResponse(
      'Error! Authentication is required!',
      STATUS_CODE.UNAUTHORIZED,
    );
  }
  next();
};

export default authenticationGuardMiddleware;
