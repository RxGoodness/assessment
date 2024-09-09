import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { errorResponse } from "./responseHandler";

const validateBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const errors = validationResult(req);

  if (errors.isEmpty()) return next();
  const extractedErrors = [];
  errors.array().forEach((err: any) => {
    extractedErrors.push(`${err.param} invalid`);
  });
  const paramErrorrs = errors.array().map((error: any) => error.param);
  const paramMessageErrors = `some error occured in params: ${paramErrorrs}`;
  const err = errors.array()[0];
  const errMessage = err.msg
  return errorResponse(res, 400, `some error occured`, paramMessageErrors, errMessage);
};

export default validateBody;