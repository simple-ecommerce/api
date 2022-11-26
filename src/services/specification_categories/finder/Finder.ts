import { Id } from "../../../aliases";
import { SpecificationCategory } from "../../../models/catalog";

export class SpecificationCategoryFinder {
  id: Id;

  constructor(id: Id) {
    this.id = id;
  }

  async find() {
    const specificationCategory = await SpecificationCategory.findOne({
      where: { id: this.id },
    });

    return specificationCategory;
  }
}
