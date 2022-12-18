import { NextFunction, Request, Response } from "express";
import * as Services from "../../../../../../../services";
import { AuthenticatedHandlerResponse } from "../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";

export const show = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const item = await new Services.Items.Finder(Number(req.params.id)).find();

  if (item?.companyId !== res.locals.company.id) {
    res.locals.response = {
      status: 404,
      body: {
        message: "Couldn't find item",
      },
    };

    return next();
  }

  res.locals.response = item
    ? {
        status: 200,
        body: item,
      }
    : {
        status: 404,
        body: {
          message: "Item not found",
        },
      };

  next();
};
