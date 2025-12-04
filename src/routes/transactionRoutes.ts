import express from 'express';
import authenticationGuardMiddleware from '../middlewares/authenticationGuardMiddleware';
import {
  createNewTransactionIncome,
  createNewTransactionOutgoing,
  deleteTransactionById,
  getAllTransactions,
  getAllTransactionsByUserId,
  getTransactionById,
  updateTransactionById,
} from '../controllers/TransactionsController';

const router = express.Router();

router.use(authenticationGuardMiddleware);

// Get all transactions
router.get('/', getAllTransactions);

// Get a single transaction when the user is no matter
router.get('/:transactionId', getTransactionById);

// Pull all transactions peer USER and YEAR
router.post('/', getAllTransactionsByUserId);

// deleting existing transaction
router.delete('/:transactionId', deleteTransactionById);

// Creating a new transaction
router.post('/new/income', createNewTransactionIncome);
router.post('/new/outgoing', createNewTransactionOutgoing);

// Updating existing transaction
router.patch('/:transactionId', updateTransactionById);

export default router;
