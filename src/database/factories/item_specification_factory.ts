import { faker } from "@faker-js/faker";
import { Factories } from ".";
import { Item, ItemSpecification, Specification } from "../../models/catalog";

export const itemSpecificationFactory = async ({
  priceExtra,
  item,
  specification,
  deletedAt,
}: {
  priceExtra?: number;
  specification?: Specification;
  item?: Item;
  deletedAt?: Date;
}) => {
  const itemSpecification = new ItemSpecification();
  if (deletedAt) itemSpecification.deletedAt = deletedAt;
  itemSpecification.specificationId =
    specification?.id ?? (await Factories.Specification()).id;
  itemSpecification.itemId = item?.id ?? (await Factories.Item()).id;
  itemSpecification.priceExtra =
    priceExtra ?? faker.datatype.number({ min: 1, max: 100000 });

  return itemSpecification.save();
};
