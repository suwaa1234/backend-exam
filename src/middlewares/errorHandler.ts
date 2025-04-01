import { Request, Response, NextFunction } from "express";

interface ErrorResponse {
  status?: number;
  message: string;
}

export const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Серверт алдаа гарлаа",
  });
};
