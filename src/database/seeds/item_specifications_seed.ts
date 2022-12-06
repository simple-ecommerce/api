import { specificationsSeed } from "./specifications_seed";
import { itemsSeed } from "./items_seed";
import { itemSpecificationFactory } from "../factories/item_specification_factory";

export const itemSpecificationsSeed = async ({
  items,
  specifications,
}: {
  items: Awaited<ReturnType<typeof itemsSeed>>;
  specifications: Awaited<ReturnType<typeof specificationsSeed>>;
}) => ({
  a4Papper: {
    yellow: await itemSpecificationFactory({
      item: items.a4Paper,
      specification: specifications.dunderMifflin.color.yellow,
      priceExtra: 50,
    }),
    white: await itemSpecificationFactory({
      item: items.a4Paper,
      specification: specifications.dunderMifflin.color.white,
      priceExtra: 0,
    }),
  },
  corporateBlazer: {
    L: await itemSpecificationFactory({
      item: items.corporateBlazer,
      specification: specifications.arasaka.size.L,
      priceExtra: 100 * 100,
    }),
    M: await itemSpecificationFactory({
      item: items.corporateBlazer,
      specification: specifications.arasaka.size.M,
      priceExtra: 0,
    }),
    S: await itemSpecificationFactory({
      item: items.corporateBlazer,
      specification: specifications.arasaka.size.S,
      priceExtra: -50 * 100,
    }),
  },
});
