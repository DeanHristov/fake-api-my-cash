import {
  CookieOptions,
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import ms from 'ms';
import { STATUS_CODE } from '../utils/statusCodes';
import Response from '../utils/Response';
import authService from '../services/AuthService';

const assignTokenMiddleware = async (
  _: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction,
) => {
  const { NODE_ENV, JWT_COOKIE_EXPIRE, USE_COOKIE } = process.env;
  const { user } = res.locals;
  const token: string = await authService.createJWToken<{ userId: number }>({
    userId: user.id,
  });
  const shouldUseCookies: boolean = USE_COOKIE === 'true';

  if (shouldUseCookies) {
    const cookieOptions: CookieOptions = {
      expires: new Date(Date.now() + ms(JWT_COOKIE_EXPIRE as string)),
      httpOnly: false,
      secure: NODE_ENV === 'production',
    };

    res.cookie('token', token, cookieOptions);
  }

  res.status(STATUS_CODE.OK);
  res.json(new Response('success', token));
};

export default assignTokenMiddleware;
