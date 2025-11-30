import { Request, Response as NextResponse } from 'express';
import Response from '../utils/Response';
import { STATUS_CODE } from '../utils/statusCodes';
import healthService from '../services/HealthService';

const healthCheck = async (_: Request, res: NextResponse) => {
  const status = await healthService.healthCheck();
  res.status(STATUS_CODE.OK).json(new Response(status));
};

export { healthCheck };
