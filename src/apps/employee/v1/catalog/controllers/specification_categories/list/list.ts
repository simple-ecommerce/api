import { NextFunction, Request, Response } from "express";
import { AuthenticatedHandlerResponse } from "../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";
import * as Services from "../../../../../../../services";

export const list = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const company = res.locals.company;
  const { page, perPage } = req.query;
  const specificationCategories =
    await new Services.SpecificationCategories.Query(
      new Services.SpecificationCategories.Query().query.leftJoinAndSelect(
        "specificationCategory.specifications",
        "specification"
      )
    )
      .byCompany(company)
      .page(Number(page))
      .perPage(Number(perPage))
      .paginated();

  res.locals.response = {
    status: 200,
    body: specificationCategories,
  };

  next();
};
