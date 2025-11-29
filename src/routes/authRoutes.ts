import express, {
  NextFunction,
  Request,
  Response as ExpressResponse,
} from 'express';

const route = express.Router();

route.post(
  '/sign-in',
  (req: Request, res: ExpressResponse, next: NextFunction) => {
    console.log('sign-in', req.body);
    res.json({
      status: 'ok',
    });
  },
);

route.post(
  '/sign-up',
  (req: Request, res: ExpressResponse, next: NextFunction) => {
    res.json({
      status: 'ok',
    });
  },
);

route.get(
  '/sign-out',
  (req: Request, res: ExpressResponse, next: NextFunction) => {
    res.json({
      status: 'ok',
    });
  },
);
export default route;
