import { specificationFactory } from "../factories/specification_factory";
import { companiesSeed } from "./companies_seed";
import { specificationCategoriesSeed } from "./specification_categories_seed";

export const specificationsSeed = async ({
  specificationCategories,
}: {
  specificationCategories: Awaited<
    ReturnType<typeof specificationCategoriesSeed>
  >;
}) => {
  const white = await specificationFactory({
    name: "White",
    category: specificationCategories.dunderMifflin.color,
  });

  const yellow = await specificationFactory({
    name: "Yellow",
    category: specificationCategories.dunderMifflin.color,
  });
  const green = await specificationFactory({
    name: "Green",
    category: specificationCategories.dunderMifflin.color,
  });

  const S = await specificationFactory({
    name: "S",
    category: specificationCategories.arasaka.size,
  });
  const M = await specificationFactory({
    name: "S",
    category: specificationCategories.arasaka.size,
  });
  const L = await specificationFactory({
    name: "S",
    category: specificationCategories.arasaka.size,
  });
  const XL = await specificationFactory({
    name: "S",
    category: specificationCategories.arasaka.size,
  });

  return {
    dunderMifflin: { color: { white, yellow, green } },
    arasaka: { size: { S, M, L, XL } },
  };
};
