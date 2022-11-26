import { NextFunction, Request } from "express";
import { AuthenticatedHandlerResponse } from "../../../../../../../types/interfaces/AuthenticatedHandlerResponse";
import * as Services from "../../../../../../../services";
export const remove = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { id } = req.params;

  const company = res.locals.company;

  const specificationCategory =
    await new Services.SpecificationCategories.Finder(Number(id)).find();

  if (!specificationCategory) {
    res.locals.response = {
      status: 404,
      body: {
        message: "The specification category does not exist",
      },
    };

    return next();
  }
  if (specificationCategory.companyId !== company.id) {
    res.locals.response = {
      status: 403,
      body: {
        message: "The specification category does not belong to your company",
      },
    };

    return next();
  }

  const removed = await new Services.SpecificationCategories.Remover(
    specificationCategory
  ).remove();

  res.locals.response = {
    status: 200,
    body: removed,
  };

  next();
};
