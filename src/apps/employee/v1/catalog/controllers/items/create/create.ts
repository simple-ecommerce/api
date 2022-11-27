import { NextFunction, Request, Response } from "express";
import * as Services from "../../../../../../../services";
import { AuthenticatedHandlerResponse } from "../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";

export const create = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const company = res.locals.company;

    const item = await new Services.Items.Creator({
      company,
      ...payload,
    }).create();

    res.locals.response = {
      status: 201,
      body: item,
    };
  } catch (error) {
    res.locals.response = {
      status: 400,
      body: { message: error },
    };
  } finally {
    next();
  }
};
