import { SpecificationCategory } from "../../../models/catalog";

export class SpecificationCategoryRemover {
  specificationCategory: SpecificationCategory;

  constructor(specificationCategory: SpecificationCategory) {
    this.specificationCategory = specificationCategory;
  }

  async remove() {
    return this.specificationCategory.softRemove();
  }
}
