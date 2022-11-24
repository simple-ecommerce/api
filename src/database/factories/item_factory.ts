import { faker } from "@faker-js/faker";
import { Item } from "../../models/catalog";
import { Company } from "../../models/core";
import { companyFactory } from "./company_factory";

export const itemFactory = async ({
  company,
  name,
  sku,
  price,
  longDescription,
  shortDescription,
  ean,
  brand,
}: {
  price?: number;
  company?: Company;
  name?: string;
  sku?: string;
  ean?: string;
  shortDescription?: string;
  longDescription?: string;
  brand?: string;
} = {}) => {
  const item = new Item();
  item.company = company ?? (await companyFactory());
  item.name = faker.commerce.productName() ?? name;
  item.shortDescription = shortDescription ?? faker.commerce.productAdjective();
  item.longDescription = longDescription ?? faker.commerce.productDescription();
  item.price = price ?? Number(faker.random.numeric(10));
  item.sku = sku ?? faker.random.alphaNumeric(10);
  item.ean = ean ?? faker.random.alphaNumeric(10);
  item.brand = brand ?? faker.company.name();
  await item.save();

  return item;
};
