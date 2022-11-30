import { employeeCompanyFactory } from "../factories/company_employee_factory";
import { companiesSeed } from "./companies_seed";
import { employeesSeed } from "./employees_seed";

export const employeeCompaniesSeed = async ({
  employees,
  companies,
}: {
  employees: Awaited<ReturnType<typeof employeesSeed>>;
  companies: Awaited<ReturnType<typeof companiesSeed>>;
}) => {
  await employeeCompanyFactory({
    company: companies.arasaka,
    employee: employees.saburo,
  });
  await employeeCompanyFactory({
    company: companies.arasaka,
    employee: employees.yorinobu,
  });
  await employeeCompanyFactory({
    company: companies.dunderMifflin,
    employee: employees.michaelScott,
  });
  await employeeCompanyFactory({
    company: companies.dunderMifflin,
    employee: employees.pam,
  });
};
