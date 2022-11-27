import { NextFunction, Request } from "express";
import { AuthenticatedHandlerResponse } from "../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";
import * as Services from "../../../../../../../services";

export const update = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { id } = req.params as unknown as { id: string };
  const { name, description, internalName } = req.body as unknown as {
    name: string;
    description: string;
    internalName?: string;
  };
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

  const updatedSpecificationCategory =
    await new Services.SpecificationCategories.Updater(
      specificationCategory
    ).update({
      name,
      description,
      internalName,
    });

  res.locals.response = {
    status: 200,
    body: updatedSpecificationCategory,
  };

  next();
};
