import { Id } from "../../aliases";
import { Company } from "../../models/core/Company";

export class CompanyFinder {
  id?: Id;

  constructor({ id }: { id: Id }) {
    this.id = id;
  }

  async find() {
    const company = await Company.findOneOrFail({ where: { id: this.id } });

    return company;
  }
}
