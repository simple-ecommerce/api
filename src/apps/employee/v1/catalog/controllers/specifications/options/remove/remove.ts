import { NextFunction } from "express";

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};
