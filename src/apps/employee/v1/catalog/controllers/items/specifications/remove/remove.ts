import { NextFunction, Request } from "express";
import { AuthenticatedHandlerResponse } from "../../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";
import * as Services from "../../../../../../../../services";

export const remove = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { itemId, specificationId } = req.params;
  const company = res.locals.company;

  const item = await new Services.Items.Finder(Number(itemId)).find();

  if (!item || item.companyId !== company.id) {
    res.locals.response = {
      status: 404,
      body: {
        message: "Item not found",
      },
    };

    return next();
  }

  const specification = await new Services.Specifications.Finder(
    Number(specificationId)
  ).find();

  if (!specification || specification.category.companyId !== company.id) {
    res.locals.response = {
      status: 404,
      body: {
        message: "Specification not found",
      },
    };

    return next();
  }

  const itemSpecification = await new Services.ItemSpecifications.Finder({
    item,
    specification,
  }).find();

  if (!itemSpecification) {
    res.locals.response = {
      status: 404,
      body: {
        message: "Item specification not found",
      },
    };

    return next();
  }

  const removedItemSpecification =
    await new Services.ItemSpecifications.Remover(itemSpecification).remove();

  res.locals.response = {
    status: 200,
    body: removedItemSpecification,
  };
  return next();
};
