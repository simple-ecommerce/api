import { NextFunction, Request, Response } from "express";
import * as Services from "../../../../../../../services";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { companyId, page, perPage } = req.query;

  const { pagination, results } = await new Services.Items.Query()
    .byCompany(Number(companyId))
    .page(Number(page))
    .perPage(Number(perPage))
    .paginated();

  res.locals.response = {
    status: 200,
    body: { pagination, results },
  };

  return next();
};
