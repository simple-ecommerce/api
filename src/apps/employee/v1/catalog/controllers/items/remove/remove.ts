import { NextFunction, Request, Response } from "express";
import * as Services from "../../../../../../../services";
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req?.params?.id;
  const company = res.locals.company;
  const item = await new Services.Items.Finder(Number(id)).find();

  if (!item) {
    res.locals.response = {
      status: 404,
      body: {
        message: "Item not found",
      },
    };
    return next();
  }
  if (item.companyId !== company.id) {
    res.locals.response = {
      status: 403,
      body: {
        message: "You don't have permission to remove this item",
      },
    };
    return next();
  }

  await new Services.Items.Remover(item).remove();
  res.locals.response = {
    status: 200,
    body: item,
  };
  next();
};
