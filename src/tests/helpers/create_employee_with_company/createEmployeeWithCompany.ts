import { Factories } from "../../../database/factories";
import { Company, Employee } from "../../../models/core";

export const createEmployeeWithCompany = async ({
  company,
  employee,
}: {
  company?: Company;
  employee?: Employee;
} = {}) => {
  const _employee = employee ?? (await Factories.Employee());
  const _company = company ?? (await Factories.Company());
  await Factories.EmployeeCompany({ employee: _employee, company: _company });

  return _employee;
};
