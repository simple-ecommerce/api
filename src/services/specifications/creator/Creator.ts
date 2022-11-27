import { Specification } from "../../../models/catalog";

export class SpecificationCreator {
  specification: Specification = new Specification();

  constructor({
    name,
    description,
    category,
  }: Pick<Specification, "name" | "category" | "description">) {
    this.specification.name = name;
    this.specification.description = description;
    this.specification.category = category;
  }

  async create() {
    return this.specification.save();
  }
}
