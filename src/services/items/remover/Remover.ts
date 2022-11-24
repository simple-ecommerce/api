import { Item } from "../../../models/catalog";

export class ItemRemover {
  item: Item;
  constructor(item: Item) {
    this.item = item;
  }

  async remove() {
    return this.item.softRemove();
  }
}
