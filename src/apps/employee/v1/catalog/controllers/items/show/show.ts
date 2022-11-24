import { NextFunction, Request, Response } from "express";
import * as Services from "../../../../../../../services";
import { AuthenticatedHandlerResponse } from "../../../../../../../types/interfaces/AuthenticatedHandlerResponse";

export const show = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const item = await new Services.Items.Query()
    .byCompany(res.locals.company)
    .byId(Number(req.params.id))
    .one();

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
