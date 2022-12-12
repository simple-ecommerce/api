import { NextFunction, Request } from "express";
import { AuthenticatedHandlerResponse } from "../../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";
import * as Services from "../../../../../../../../services";

export const create = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { itemId } = req.params;
  const item = await new Services.Items.Finder(Number(itemId)).find();
  const company = res.locals.company;

  if (!item || item.companyId !== company.id) {
    res.locals.response = {
      status: 404,
      body: {
        message: "Item not found",
      },
    };

    return next();
  }

  const { specificationId, priceExtra } = req.body;

  const specification = await new Services.Specifications.Finder(
    specificationId
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

  try {
    const itemSpecification = await new Services.ItemSpecifications.Creator({
      item,
      specification,
      priceExtra,
    }).create();

    res.locals.response = {
      status: 201,
      body: itemSpecification,
    };
  } catch (error: any) {
    if (error.code == "SQLITE_CONSTRAINT") {
      res.locals.response = {
        status: 409,
        body: {
          message: "Item specification already exists",
        },
      };
      return next();
    }
    res.locals.response = {
      status: 500,
      body: {
        message: "Internal server error",
      },
    };
  } finally {
    return next();
  }
};
