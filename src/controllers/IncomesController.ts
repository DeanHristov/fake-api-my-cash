import { Request, Response as NextResponse } from 'express';
import Response from '../utils/Response';
import { STATUS_CODE } from '../utils/statusCodes';
import incomesService, { IIncome } from '../services/IncomesService';
import ErrorResponse from '../utils/ErrorResponse';
import Utils from '../utils/Utils';

const getIncomeById = async (req: Request, res: NextResponse) => {
  const { incomeId } = req.params;
  const record: IIncome | null = await incomesService.getById(incomeId);

  if (Utils.isNotNull(record)) {
    res
      .status(STATUS_CODE.OK)
      .json(new Response('ok', record || ({} as IIncome)));
  }

  throw new ErrorResponse(
    `Error! Resource is not found!`,
    STATUS_CODE.NOT_FOUND,
  );
};

const getAllIncomes = async (req: Request, res: NextResponse) => {
  const records: IIncome[] = await incomesService.getAll();

  res.status(STATUS_CODE.OK).json(new Response('ok', records || []));
};

const getAllByDate = async (req: Request, res: NextResponse) => {
  //TODO Implement it!
  throw new Error('Method not implemented.');
};

const updateIncomeById = async (req: Request, res: NextResponse) => {
  const { incomeId } = req.params;

  //TODO Implement it!
  throw new Error('Method not implemented.');
};

const replaceIncomeById = async (req: Request, res: NextResponse) => {
  const { incomeId } = req.params;

  //TODO Implement it!
  throw new Error('Method not implemented.');
};

const deleteIncomeById = async (req: Request, res: NextResponse) => {
  const { incomeId } = req.params;
  const isDeleted: boolean = await incomesService.deleteById(incomeId);

  if (isDeleted) return res.json(new Response('ok'));

  throw new ErrorResponse(
    `Error! Resource is not found!`,
    STATUS_CODE.NOT_FOUND,
  );
};

export {
  getIncomeById,
  getAllIncomes,
  getAllByDate,
  deleteIncomeById,
  updateIncomeById,
  replaceIncomeById,
};
