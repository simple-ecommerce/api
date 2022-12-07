import {
  Item,
  ItemSpecification,
  Specification,
} from "../../../models/catalog";

export class ItemSpecificationCreator {
  item: Item;
  specification: Specification;
  priceExtra: number;

  constructor({
    item,
    specification,
    priceExtra,
  }: {
    item: Item;
    specification: Specification;
    priceExtra?: number;
  }) {
    this.item = item;
    this.specification = specification;
    this.priceExtra = priceExtra ?? 0;
  }

  async create() {
    const itemSpecification = ItemSpecification.create({
      priceExtra: this.priceExtra,
      item: this.item,
      specification: this.specification,
    });

    return itemSpecification.save();
  }
}
