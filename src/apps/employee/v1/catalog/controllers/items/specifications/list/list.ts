import { NextFunction, Request } from "express";
import { AuthenticatedHandlerResponse } from "../../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";
import * as Services from "../../../../../../../../services";

export const list = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { page, perPage } = req.query;
  const { itemId } = req.params;

  const item = await new Services.Items.Finder(Number(itemId)).find();

  if (!item || item.companyId !== res.locals.company.id) {
    res.locals.response = {
      status: 404,
      body: {
        message: "Item not found",
      },
    };
    return next();
  }

  const { pagination, results } = await new Services.ItemSpecifications.Query()
    .byItem(item)
    .page(Number(page))
    .perPage(Number(perPage))
    .paginated();

  res.locals.response = {
    status: 200,
    body: { pagination, results },
  };

  return next();
};
