import { NextFunction, Request, Response } from "express";
import { Helpers } from "../helpers";

export const transformResponseToSnakeCaseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals = Helpers.Object.toSnakeCase(res.locals) as any;

  next();
};
