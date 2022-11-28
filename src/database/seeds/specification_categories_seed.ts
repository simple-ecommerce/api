import { specificationCategoryFactory } from "../factories/specification_category_factory";
import { companiesSeed } from "./companies_seed";

export const specificationCategoriesSeed = async ({
  companies,
}: {
  companies: Awaited<ReturnType<typeof companiesSeed>>;
}) => {
  const color = await specificationCategoryFactory({
    name: "Color",
    company: companies.dunderMifflin,
  });

  const size = await specificationCategoryFactory({
    name: "Size",
    company: companies.arasaka,
  });

  return {
    arasaka: {
      size,
    },
    dunderMifflin: {
      color,
    },
  };
};
