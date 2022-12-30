import { NextFunction, Request } from "express";
import * as Services from "../../../../../../../../services";
import { AuthenticatedHandlerResponse } from "../../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";

export const remove = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { itemId, imageId } = req.params;
  const company = res.locals.company;

  const item = await new Services.Items.Finder(Number(itemId)).find();

  if (!item || item.companyId !== company.id) {
    res.locals.response = {
      status: 404,
      body: { msg: "item not found" },
    };

    return next();
  }

  const image = await new Services.Images.Finder(Number(imageId)).find();

  if (!image || image.itemId !== item.id) {
    res.locals.response = {
      status: 404,
      body: { msg: "image not found" },
    };

    return next();
  }

  const removedImage = await new Services.Images.Remover(image).remove();

  res.locals.response = {
    status: 200,
    body: removedImage,
  };

  next();
};
