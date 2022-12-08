import {
  Item,
  ItemSpecification,
  Specification,
} from "../../../models/catalog";
import { Id } from "../../../utils/aliases";

export class ItemSpecificationFinder {
  itemId: Id;
  specificationId: Id;

  constructor({
    item,
    specification,
  }: {
    item: Item | Id;
    specification: Specification | Id;
  }) {
    this.itemId = typeof item === "object" ? item.id : item;
    this.specificationId =
      typeof specification === "object" ? specification.id : specification;
  }

  async find() {
    const itemSpecification = await ItemSpecification.findOne({
      where: {
        itemId: this.itemId,
        specificationId: this.specificationId,
      },
    });

    return itemSpecification;
  }
}
