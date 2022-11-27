import { NextFunction, Request } from "express";
import { AuthenticatedHandlerResponse } from "../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";
import * as Services from "../../../../../../../services";

export const create = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { name, description, internalName } = req.body as unknown as {
    name: string;
    description: string;
    internalName?: string;
  };
  const company = res.locals.company;

  const specificationCategory =
    await new Services.SpecificationCategories.Creator({
      name,
      description,
      company,
      internalName,
    }).create();

  res.locals.response = {
    status: 201,
    body: specificationCategory,
  };

  next();
};
