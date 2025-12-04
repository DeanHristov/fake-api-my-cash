import { Request, Response as NextResponse } from 'express';

const getOutgoingById = async (req: Request, res: NextResponse) => {
  //TODO Implement it!
  throw new Error('Method not implemented.');
};

const getAllOutgoings = async (req: Request, res: NextResponse) => {
  //TODO Implement it!
  throw new Error('Method not implemented.');
};

const getAllByDate = async (req: Request, res: NextResponse) => {
  //TODO Implement it!
  throw new Error('Method not implemented.');
};

const updateOutgoingsById = async (req: Request, res: NextResponse) => {
  const { outgoingId } = req.params;

  //TODO Implement it!
  throw new Error('Method not implemented.');
};

const replaceOutgoingsById = async (req: Request, res: NextResponse) => {
  const { outgoingId } = req.params;

  //TODO Implement it!
  throw new Error('Method not implemented.');
};

const deleteOutgoingsById = async (req: Request, res: NextResponse) => {
  const { outgoingId } = req.params;

  //TODO Implement it!
  throw new Error('Method not implemented.');
};

export {
  getOutgoingById,
  getAllOutgoings,
  getAllByDate,
  deleteOutgoingsById,
  updateOutgoingsById,
  replaceOutgoingsById,
};
