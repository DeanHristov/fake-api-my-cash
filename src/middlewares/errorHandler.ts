import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/ErrorResponse';

//@see: https://expressjs.com/en/guide/error-handling.html
const errorHandler = (
  err: ErrorResponse,
  _: Request,
  res: Response,
  next: NextFunction,
): void => {
  const error = { ...err };

  res.status(error.statusCode ?? 500);
  res.json({
    statusCode: error?.statusCode ?? err?.statusCode,
    error: error?.message ?? err?.message,
    data: [],
  });

  next();
};

export default errorHandler;
