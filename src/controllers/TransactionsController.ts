import { Request, Response as NextResponse } from 'express';
import Response from '../utils/Response';
import { STATUS_CODE } from '../utils/statusCodes';
import transactionsService, {
  ITransaction,
} from '../services/TransactionsService';
import Utils from '../utils/Utils';
import ErrorResponse from '../utils/ErrorResponse';
import { IPagination, ParsedQs, usePagination } from '../utils/usePagination';

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
  const { userId, byDate, page, limit } = req.body;
  const transactions: ITransaction[] | null =
    await transactionsService.getAllByUserId(userId, byDate);

  //TODO Summarize output data with pagination!
  if (Utils.isNotEmpty(transactions)) {
    const withPagination: IPagination<ITransaction> =
      usePagination<ITransaction>(transactions || [], {
        page,
        limit,
      } as ParsedQs);

    return res.json(
      new Response<IPagination<ITransaction>>('ok', withPagination),
    );
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
  const allTransactions: ITransaction[] =
    (await transactionsService.getAll()) || [];

  const withPagination: IPagination<ITransaction> = usePagination<ITransaction>(
    allTransactions,
    req.query as ParsedQs,
  );

  return res.json(
    new Response<IPagination<ITransaction>>('ok', withPagination),
  );
};

const updateTransactionById = async (req: Request, res: NextResponse) => {
  // const { transactionId } = req.params;

  //TODO Implement it!
  throw new Error('Method not implemented.');
};
const createNewTransactionIncome = async (req: Request, res: NextResponse) => {
  const { userId, amount, description, type, status, incomeType, createdAt } =
    req.body;

  await transactionsService.createNewIncomeTransaction(
    userId,
    amount,
    description,
    status,
    type,
    incomeType,
    createdAt,
  );

  res.json(new Response('ok'));
};

const createNewTransactionOutgoing = async (
  req: Request,
  res: NextResponse,
) => {
  const { userId, amount, description, type, status, outgoingType, createdAt } =
    req.body;

  await transactionsService.createNewOutgoingTransaction(
    userId,
    amount,
    description,
    status,
    type,
    outgoingType,
    createdAt,
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
