import { NextFunction } from "express";

export const show = async (req: Request, res: Response, next: NextFunction) => {
  next();
};
