import { ItemSpecification } from "../../../models/catalog";

export class ItemSpecificationRemover {
  itemSpecification: ItemSpecification;

  constructor(itemSpecification: ItemSpecification) {
    this.itemSpecification = itemSpecification;
  }

  async remove() {
    return this.itemSpecification.softRemove();
  }
}
