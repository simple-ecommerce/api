import { NextFunction, Request, Response } from "express";

export const sendResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(res.locals.status).json(res.locals.body);
};
