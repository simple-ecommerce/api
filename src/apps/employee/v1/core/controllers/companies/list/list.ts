import { NextFunction, Request } from "express";
import { AuthenticatedHandlerResponse } from "../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";
import * as Services from "../../../../../../../services";

export const list = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { page, perPage } = req.query;
  const employee = res.locals.employee;

  const { pagination, results } = await new Services.Companies.Query()
    .byEmployee(employee)
    .page(Number(page))
    .perPage(Number(perPage))
    .paginated();

  res.locals.response = {
    body: { pagination, results },
    status: 200,
  };

  return next();
};
