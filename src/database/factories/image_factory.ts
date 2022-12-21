import { faker } from "@faker-js/faker";
import { Factories } from ".";
import { Item } from "../../models/catalog";
import { Image } from "../../models/core";

export const imageFactory = async ({
  position,
  src,
  item,
  fileName,
}: {
  position?: number;
  src?: string;
  item?: Item;
  fileName?: string;
} = {}) => {
  const image = new Image();

  image.position = position ? position : 0;
  image.src = src ? src : "https://picsum.photos/200";
  image.fileName = fileName ? fileName : faker.database.mongodbObjectId();
  image.item = item ? item : await Factories.Item();

  return image.save();
};
