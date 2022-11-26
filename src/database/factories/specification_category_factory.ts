import { faker } from "@faker-js/faker";
import { Specification, SpecificationCategory } from "../../models/catalog";
import { Company } from "../../models/core";
import { companyFactory } from "./company_factory";

export const specificationCategoryFactory = async ({
  name,
  description,
  internalName,
  company,
  specifications,
}: {
  name?: string;
  description?: string;
  internalName?: string;
  company?: Company;
  specifications?: Specification[];
} = {}) => {
  const specificationCategory = new SpecificationCategory();

  specificationCategory.name = name ?? faker.commerce.department();
  specificationCategory.description =
    description ?? faker.commerce.productAdjective();
  specificationCategory.internalName =
    internalName ?? `${specificationCategory.name} 1`;
  specificationCategory.company = company ?? (await companyFactory());
  if (specifications) specificationCategory.specifications = specifications;

  return specificationCategory.save();
};
