import { NextFunction, Request, Response } from "express";
import { Helpers } from "../helpers";

export const transformResponseToSnakeCaseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.response = Helpers.Object.toSnakeCase(res.locals.response) as any;

  next();
};
