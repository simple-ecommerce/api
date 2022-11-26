import { faker } from "@faker-js/faker";
import { Specification, SpecificationCategory } from "../../models/catalog";
import { specificationCategoryFactory } from "./specification_category_factory";

export const specificationFactory = async ({
  name,
  category,
  description,
}: {
  name?: string;
  description?: string;
  category?: SpecificationCategory;
}) => {
  const specification = new Specification();

  specification.name = name ?? faker.commerce.productAdjective();
  specification.description =
    description ?? faker.commerce.productDescription();
  specification.category = category ?? (await specificationCategoryFactory());

  return specification.save();
};
