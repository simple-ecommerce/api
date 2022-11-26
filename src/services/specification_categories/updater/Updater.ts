import { SpecificationCategory } from "../../../models/catalog";

export class SpecificationCategoryUpdater {
  specificationCategory: SpecificationCategory;

  constructor(specificationCategory: SpecificationCategory) {
    this.specificationCategory = specificationCategory;
  }

  async update({
    name,
    description,
    internalName,
  }: {
    name?: string;
    description?: string;
    internalName?: string;
  }) {
    if (name) this.specificationCategory.name = name;
    if (description) this.specificationCategory.description = description;
    if (internalName) this.specificationCategory.internalName = internalName;

    return await this.specificationCategory.save();
  }
}
