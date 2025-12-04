import express from 'express';
import authenticationGuardMiddleware from '../middlewares/authenticationGuardMiddleware';
import {
  deleteIncomeById,
  getAllByDate,
  getAllIncomes,
  getIncomeById,
  replaceIncomeById,
  updateIncomeById,
} from '../controllers/IncomesController';

const router = express.Router();

router.use(authenticationGuardMiddleware);

router.get('/:incomeId', getIncomeById);
router.delete('/:incomeId', deleteIncomeById);
router.patch('/:incomeId', updateIncomeById);
router.post('/:incomeId', replaceIncomeById);

router.get('/', getAllIncomes);
router.post('/', getAllByDate);
export default router;
