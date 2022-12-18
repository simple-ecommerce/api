import { itemsSeed } from "./items_seed";
import { Factories } from "../factories";
import { faker } from "@faker-js/faker";

export const imagesSeed = async ({
  items,
}: {
  items: Awaited<ReturnType<typeof itemsSeed>>;
}) => {
  await Factories.Image({
    index: 0,
    item: items.corporateBlazer,
    src: faker.image.fashion(),
  });
  await Factories.Image({
    index: 1,
    item: items.corporateBlazer,
    src: faker.image.fashion(),
  });

  await Factories.Image({
    index: 0,
    item: items.a4Paper,
    src: faker.image.business(),
  });
  await Factories.Image({
    index: 1,
    item: items.a4Paper,
    src: faker.image.business(),
  });
};
