import express from 'express';
import authenticationGuardMiddleware from '../middlewares/authenticationGuardMiddleware';
import {
  deleteOutgoingsById,
  getAllByDate,
  getAllOutgoings,
  getOutgoingById,
  updateOutgoingsById,
} from '../controllers/OutgoingsController';
import { replaceIncomeById } from '../controllers/IncomesController';

const router = express.Router();

router.use(authenticationGuardMiddleware);

router.get('/', getAllOutgoings);
router.post('/', getAllByDate);

router.get('/:incomeId', getOutgoingById);
router.delete('/:incomeId', deleteOutgoingsById);
router.patch('/:incomeId', updateOutgoingsById);
router.post('/:incomeId', replaceIncomeById);

export default router;
