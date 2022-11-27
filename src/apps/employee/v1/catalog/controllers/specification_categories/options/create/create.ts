import { NextFunction, Request, Response } from "express";
import * as Services from "../../../../../../../../services";
import { AuthenticatedHandlerResponse } from "../../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";

export const create = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { name, description } = req.body as Record<
    "name" | "description",
    string
  >;
  const { specificationCategoryId } = req.params;
  const company = res.locals.company;
  const specificationCategory =
    await new Services.SpecificationCategories.Finder(
      Number(specificationCategoryId)
    ).find();

  if (!specificationCategory) {
    res.locals.response = {
      status: 404,
      body: {
        message: "Specification category not found",
      },
    };
    return next();
  }

  if (specificationCategory.companyId !== company.id) {
    res.locals.response = {
      status: 401,
      body: {
        message: "You can't create a specification option for this category.",
      },
    };
  }

  const specification = await new Services.Specifications.Creator({
    category: specificationCategory,
    description,
    name,
  }).create();

  res.locals.response = {
    status: 200,
    body: specification,
  };
};
