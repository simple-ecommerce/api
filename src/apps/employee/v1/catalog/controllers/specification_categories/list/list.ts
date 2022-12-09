import { NextFunction, Request, Response } from "express";
import { AuthenticatedHandlerResponse } from "../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";
import * as Services from "../../../../../../../services";
import { Serializers } from "../../../../../../../serializers";

export const list = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const company = res.locals.company;
  const { page, perPage, itemId } = req.query;

  const { pagination, results } =
    await new Services.SpecificationCategories.Query(
      new Services.SpecificationCategories.Query().query.leftJoinAndSelect(
        "specificationCategory.specifications",
        "specification"
      )
    )
      .byCompany(company)
      .byItem(itemId ? Number(itemId) : undefined)
      .page(Number(page))
      .perPage(Number(perPage))
      .paginated();

  res.locals.response = {
    status: 200,
    body: {
      pagination,
      results: new Serializers.SpecificationCategory().serializeMany(results),
    },
  };

  next();
};
