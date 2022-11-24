import { Id } from "../../../aliases";
import { Item } from "../../../models/catalog";

export class ItemFinder {
  id: Id;

  constructor(id: Id) {
    this.id = id;
  }

  async find() {
    const item = await Item.findOneOrFail({
      where: { id: this.id },
    });

    return item;
  }
}
