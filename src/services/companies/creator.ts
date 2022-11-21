import { Company } from "../../models/core";

export class CompanyCreator {
  name: string;

  constructor({ name }: { name: string }) {
    this.name = name;
  }

  async create() {
    const company = Company.create();
    company.name = this.name;

    await company.save();

    return company;
  }
}
