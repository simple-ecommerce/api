import { faker } from "@faker-js/faker";
import { Company } from "../../models/core/Company";
import { Employee } from "../../models/core/Employee";
import { companyFactory } from "./company_factory";

export const employeeFactory = async ({
  email,
  password,
  company,
  isAdmin,
}: {
  email?: string;
  password?: string;
  company?: Company;
  isAdmin?: boolean;
} = {}) => {
  const employee = new Employee();
  employee.email = email ?? faker.internet.email();
  employee.password = password ?? faker.internet.password();
  employee.company = company ?? (await companyFactory());
  employee.isAdmin = typeof isAdmin === "boolean" ? isAdmin : true;
  await employee.save();

  return employee;
};
