import { NextFunction, Request, Response } from "express";
import { Item } from "../../../../../../../../models/catalog";
import * as Services from "../../../../../../../../services";
import { AuthenticatedHandlerResponse } from "../../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";

export const update = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { itemId, imageId } = req.params;
  const company = res.locals.company;
  const { position } = req.body;

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

  if (image.position === position) {
    res.locals.response = {
      status: 200,
      body: image,
    };

    return next();
  }

  const previousPositionedImage = await new Services.Images.Query()
    .byPosition(position)
    .byItem(item)
    .one();

  if (!previousPositionedImage) {
    res.locals.response = {
      status: 404,
      body: {
        message: "Previous positioned image not found",
      },
    };

    return next();
  }

  await new Services.Images.Swapper(image, previousPositionedImage).swap();

  await image.reload();

  res.locals.response = {
    status: 200,
    body: image,
  };

  return next();
};
