import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../helpers/api-erros'

export const errorMiddleware = (
  error: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  const statusCode = 500;
  const message = error instanceof Error ? error.message : 'Internal Server Error';
  return res.status(statusCode).json({ message });
}
