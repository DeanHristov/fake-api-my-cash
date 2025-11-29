import express, {
  NextFunction,
  Request,
  Response as ExpressResponse,
} from 'express';
import grantAuthentication from '../middlewares/authHandler';

const router = express.Router();

router.use(grantAuthentication);

// Get a single transaction
router.get(
  '/:transactionId',
  (req: Request, res: ExpressResponse, next: NextFunction) => {
    res.json({
      status: 'ok',
    });
  },
);

// Pull all transactions peer USER and YEAR
router.post('/', (req: Request, res: ExpressResponse, next: NextFunction) => {
  // const { userId, byYear } = req.body;
  res.json({
    status: 'ok',
  });
});

// Creating a new transaction
router.post(
  '/new',
  (req: Request, res: ExpressResponse, next: NextFunction) => {
    res.json({
      status: 'ok',
    });
  },
);

// Updating existing transaction
router.patch(
  '/:transactionId',
  (req: Request, res: ExpressResponse, next: NextFunction) => {
    res.json({
      status: 'ok',
    });
  },
);

// deleting existing transaction
router.delete(
  '/:transactionId',
  (req: Request, res: ExpressResponse, next: NextFunction) => {
    res.json({
      status: 'ok',
    });
  },
);
export default router;
