import { NextFunction, Request, Response as ExpressResponse } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Utils from '../utils/Utils';
import ErrorResponse from '../utils/ErrorResponse';
import Auth from '../controllers/Auth';
import { STATUS_CODE } from '../utils/statusCodes';

const grantAuthentication = async (
  req: Request,
  _: ExpressResponse,
  next: NextFunction,
): Promise<void> => {
  const { JWT_SECRET } = process.env;
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

  const decodedToken = Auth.decodeJWToken<JwtPayload>(token, JWT_SECRET);
  if (Utils.isNull(decodedToken)) {
    throw new ErrorResponse(
      'Error! Authentication is required!',
      STATUS_CODE.UNAUTHORIZED,
    );
  }
  next();
};

export default grantAuthentication;
