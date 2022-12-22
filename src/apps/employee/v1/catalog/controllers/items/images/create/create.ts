import { NextFunction, Request } from "express";
import { AuthenticatedHandlerResponse } from "../../../../../../../../utils/types/interfaces/AuthenticatedHandlerResponse";
import { Serializers } from "../../../../../../../../serializers";
import * as Services from "../../../../../../../../services";

export const create = async (
  req: Request,
  res: AuthenticatedHandlerResponse,
  next: NextFunction
) => {
  const { itemId } = req.params;
  const { company_id } = req.body;
  const files = req.files;

  const item = await new Services.Items.Finder(Number(itemId)).find();

  if (!item || item.companyId !== Number(company_id)) {
    res.locals.response = {
      status: 404,
      body: { msg: "item not found" },
    };

    return next();
  }

  const lastItem = await new Services.Images.Query()
    .byItem(item)
    .sortByPosition("DESC")
    .one();

  const position = lastItem ? lastItem.position + 1 : 1;

  const images = await Promise.all(
    (files as any[])?.map((file, index) =>
      new Services.Images.Creator({
        fileName: file.filename,
        item,
        position: position + index,
        src: file.path,
      }).create()
    )
  );

  res.locals.response = {
    status: 200,
    body: new Serializers.Image().serializeMany(images),
  };

  next();
};
