import { NextFunction, Request, Response } from "express";
import { Helpers } from "../utils/helpers";

export const transformRequestToCamelCaseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body = Helpers.Object.toCamelCase(req.body);
  req.params = Helpers.Object.toCamelCase(req.params);
  req.query = Helpers.Object.toCamelCase(req.query);

  next();
};
