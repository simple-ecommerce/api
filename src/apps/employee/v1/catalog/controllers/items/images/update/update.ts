import { NextFunction, Request, Response } from "express";
import * as Services from "../../../../../../../../services";
import { AuthenticatedHandlerResponse } from "../../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";

export const update = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { itemId, imageId } = req.params;
  const company = res.locals.company;
  const { index } = req.body;

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

  const image = await new Services.Images.Finder(Number(imageId)).find();

  if (!image || image.itemId !== item.id) {
    res.locals.response = {
      status: 404,
      body: {
        message: "Image not found",
      },
    };

    return next();
  }

  const updatedImage = await new Services.Images.Updater(image).update({
    index,
  });

  res.locals.response = {
    status: 200,
    body: updatedImage,
  };

  return next();
};
