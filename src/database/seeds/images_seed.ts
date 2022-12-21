import { itemsSeed } from "./items_seed";
import { Factories } from "../factories";
import { faker } from "@faker-js/faker";

export const imagesSeed = async ({
  items,
}: {
  items: Awaited<ReturnType<typeof itemsSeed>>;
}) => {
  await Factories.Image({
    position: 1,
    item: items.corporateBlazer,
    src: faker.image.fashion(),
  });
  await Factories.Image({
    position: 2,
    item: items.corporateBlazer,
    src: faker.image.fashion(),
  });

  await Factories.Image({
    position: 1,
    item: items.a4Paper,
    src: faker.image.business(),
  });
  await Factories.Image({
    position: 2,
    item: items.a4Paper,
    src: faker.image.business(),
  });
};
