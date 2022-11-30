import { faker } from "@faker-js/faker";
import { Company } from "../../models/core/Company";

export const companyFactory = async ({ name }: { name?: string } = {}) => {
  const company = new Company();
  company.name = name ?? faker.company.name();

  return company.save();
};
