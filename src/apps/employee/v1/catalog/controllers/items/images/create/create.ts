import { NextFunction, Request, Response } from "express";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
