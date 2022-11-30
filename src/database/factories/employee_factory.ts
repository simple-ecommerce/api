import { faker } from "@faker-js/faker";
import { Company } from "../../models/core/Company";
import { Employee } from "../../models/core/Employee";

export const employeeFactory = async ({
  email,
  password,
  isAdmin,
}: {
  email?: string;
  password?: string;
  isAdmin?: boolean;
} = {}) => {
  const employee = new Employee();
  employee.email = email ?? faker.internet.email();
  employee.password = password ?? faker.internet.password();
  employee.isAdmin = typeof isAdmin === "boolean" ? isAdmin : true;

  return employee.save();
};
