import { faker } from "@faker-js/faker";
import { Factories } from ".";
import { Item } from "../../models/catalog";
import { Image } from "../../models/core";

export const imageFactory = async ({
  index,
  src,
  item,
  fileName,
}: {
  index?: number;
  src?: string;
  item?: Item;
  fileName?: string;
} = {}) => {
  const image = new Image();

  image.index = index ? index : 0;
  image.src = src ? src : "https://picsum.photos/200";
  image.fileName = fileName ? fileName : faker.database.mongodbObjectId();
  image.item = item ? item : await Factories.Item();

  return image.save();
};
