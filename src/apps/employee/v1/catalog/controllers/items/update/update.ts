import { NextFunction, Request, Response } from "express";
import { AuthenticatedHandlerResponse } from "../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";
import * as Services from "../../../../../../../services";

export const update = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { id } = req.params;

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
        message: "You don't have permission to update this item.",
      },
    };
    return next();
  }

  const {
    name,
    shortDescription,
    longDescription,
    price,
    brand,
    ean,
    gtin,
    sku,
    upc,
  } = req.body;

  const updated = await new Services.Items.Updater(item).update({
    name,
    shortDescription,
    longDescription,
    price,
    brand,
    ean,
    gtin,
    sku,
    upc,
  });

  res.locals.response = {
    status: 200,
    body: updated,
  };

  next();
};
