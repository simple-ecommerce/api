import { faker } from "@faker-js/faker";
import { Company } from "../../models/core/Company";
import { Customer } from "../../models/core/Customer";
import { companyFactory } from "./company_factory";

export const customerFactory = async ({
  email,
  password,
  company,
}: {
  email?: string;
  password?: string;
  company?: Company;
} = {}) => {
  const customer = new Customer();
  customer.email = email ?? faker.internet.email();
  customer.password = password ?? faker.internet.password();
  customer.company = company ?? (await companyFactory());
  await customer.save();

  return customer;
};
