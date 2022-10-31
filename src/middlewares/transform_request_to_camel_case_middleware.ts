import { NextFunction, Request, Response } from "express";
import { Helpers } from "../helpers";

export const transformRequestToCamelCaseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("transformObject", req.body, req.params, req.query);

  req.body = Helpers.Object.toCamelCase(req.body);
  req.params = Helpers.Object.toCamelCase(req.params);
  req.query = Helpers.Object.toCamelCase(req.query);

  next();
};
