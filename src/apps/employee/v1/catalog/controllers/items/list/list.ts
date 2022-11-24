import { NextFunction, Request } from "express";
import { AuthenticatedHandlerResponse } from "../../../../../../../types/interfaces/AuthenticatedHandlerResponse";
import * as Services from "../../../../../../../services";

export const list = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { page, perPage } = req.query as unknown as {
    page: number;
    perPage: number;
  };
  const company = res.locals.company;

  const { pagination, results } = await new Services.Items.Query()
    .byCompany(company)
    .orderBy("name", "ASC")
    .perPage(perPage)
    .page(page)
    .paginated();

  res.locals.response = {
    status: 200,
    body: {
      pagination,
      results,
    },
  };

  next();
};
