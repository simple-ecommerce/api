import { SpecificationCategory } from "../../../models/catalog";
import { Company } from "../../../models/core";

export class SpecificationCategoryCreator {
  specificationCategory: SpecificationCategory = new SpecificationCategory();

  constructor({
    company,
    description,
    internalName,
    name,
  }: {
    name: string;
    description: string;
    internalName?: string;
    company: Company;
  }) {
    this.specificationCategory.name = name;
    this.specificationCategory.description = description;
    this.specificationCategory.company = company;

    if (internalName) this.specificationCategory.internalName = internalName;
  }
  async create() {
    return await this.specificationCategory.save();
  }
}
