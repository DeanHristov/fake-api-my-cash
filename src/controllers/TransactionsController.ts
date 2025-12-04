import { Request, Response as NextResponse } from 'express';
import Response from '../utils/Response';
import { STATUS_CODE } from '../utils/statusCodes';
import transactionsService, {
  ITransaction,
} from '../services/TransactionsService';
import Utils from '../utils/Utils';
import ErrorResponse from '../utils/ErrorResponse';

// Getting a single transaction
const getTransactionById = async (req: Request, res: NextResponse) => {
  const { transactionId } = req.params;
  const selectedTransaction: ITransaction | null =
    await transactionsService.getById(transactionId);

  if (Utils.isNotEmpty(selectedTransaction)) {
    return res.json(new Response<ITransaction>('ok', selectedTransaction!));
  }

  throw new ErrorResponse(
    `Error! Resource is not found!`,
    STATUS_CODE.NOT_FOUND,
  );
};

// Getting all transactions peer user in time period
const getAllTransactionsByUserId = async (req: Request, res: NextResponse) => {
  const { userId, byDate } = req.body;
  const transactions: ITransaction[] | null =
    await transactionsService.getAllByUserId(userId, byDate);

  //TODO Summarize output data with pagination!
  if (Utils.isNotEmpty(transactions)) {
    return res.json(new Response<ITransaction[]>('ok', transactions!));
  }

  throw new ErrorResponse(
    `Error! Resource is not found!`,
    STATUS_CODE.NOT_FOUND,
  );
};

// Deleting a single transaction by id
const deleteTransactionById = async (req: Request, res: NextResponse) => {
  const { transactionId } = req.params;
  const isDeleted: boolean =
    await transactionsService.deleteById(transactionId);

  if (isDeleted) return res.json(new Response('ok'));

  throw new ErrorResponse(
    `Error! Resource is not found!`,
    STATUS_CODE.NOT_FOUND,
  );
};

// Getting all available transactions
const getAllTransactions = async (req: Request, res: NextResponse) => {
  const allTransactions: ITransaction[] | null =
    await transactionsService.getAll();

  //TODO Summarize output data with pagination!
  return res.json(new Response<ITransaction[]>('ok', allTransactions || []));
};

const updateTransactionById = async (req: Request, res: NextResponse) => {
  // const { transactionId } = req.params;

  //TODO Implement it!
  throw new Error('Method not implemented.');
};
const createNewTransactionIncome = async (req: Request, res: NextResponse) => {
  const { userId, amount, description, type, status, incomeType } = req.body;

  await transactionsService.createNewIncomeTransaction(
    userId,
    amount,
    description,
    status,
    type,
    incomeType,
  );

  res.json(new Response('ok'));
};

const createNewTransactionOutgoing = async (
  req: Request,
  res: NextResponse,
) => {
  const { userId, amount, description, type, status, outgoingType } = req.body;

  await transactionsService.createNewOutgoingTransaction(
    userId,
    amount,
    description,
    status,
    type,
    outgoingType,
  );

  res.json(new Response('ok'));
};

export {
  getTransactionById,
  getAllTransactionsByUserId,
  getAllTransactions,
  deleteTransactionById,
  updateTransactionById,
  createNewTransactionIncome,
  createNewTransactionOutgoing,
};
