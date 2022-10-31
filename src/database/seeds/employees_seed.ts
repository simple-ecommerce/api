import { Employee } from "../../models/core/Employee";
import { employeeFactory } from "../factories/employee_factory";
import { companiesSeed } from "./companies_seed";

export const employeesSeed = async ({
  companies,
}: {
  companies: Awaited<ReturnType<typeof companiesSeed>>;
}) => {
  const michaelScott = await employeeFactory({
    email: "michaelscott@dundermifflin.com",
    password: "10203040",
    company: companies.dunderMifflin,
    isAdmin: true,
  });

  const pam = await employeeFactory({
    email: "pam@dundermifflin.com",
    password: "10203040",
    company: companies.dunderMifflin,
    isAdmin: false,
  });

  const saburo = await employeeFactory({
    email: "saburo@arasaka.com",
    password: "10203040",
    company: companies.arasaka,
    isAdmin: true,
  });

  const yorinobu = await employeeFactory({
    email: "yorinobu@arasaka.com",
    password: "10203040",
    company: companies.arasaka,
    isAdmin: false,
  });

  return { michaelScott, pam, saburo, yorinobu };
};
