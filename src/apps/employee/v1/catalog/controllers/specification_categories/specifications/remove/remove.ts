import { NextFunction, Request } from "express";
import { AuthenticatedHandlerResponse } from "../../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";
import * as Services from "../../../../../../../../services";

export const remove = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { specificationCategoryId, specificationId } = req.params;
  const company = res.locals.company;

  const specificationCategory =
    await new Services.SpecificationCategories.Finder(
      Number(specificationCategoryId)
    ).find();

  const specification = await new Services.Specifications.Finder(
    Number(specificationId)
  ).find();

  if (!specificationCategory || !specification) {
    res.locals.response = {
      status: 404,
      body: {
        message: "Couldn't find specification or specification category.",
      },
    };

    return next();
  }

  if (specificationCategory.companyId !== company.id) {
    res.locals.response = {
      status: 404,
      body: {
        message: "You can't remove a specification option for this category.",
      },
    };

    return next();
  }

  if (specification.specificationCategoryId !== specificationCategory.id) {
    res.locals.response = {
      status: 404,
      body: {
        message:
          "Specification don't belong to the given specification category.",
      },
    };

    return next();
  }

  const removed = await new Services.Specifications.Remover(
    specification
  ).remove();

  res.locals.response = {
    status: 201,
    body: removed,
  };

  next();
};
