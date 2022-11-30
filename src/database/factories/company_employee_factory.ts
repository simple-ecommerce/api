import { Company, Employee } from "../../models/core";
import { EmployeeCompany } from "../../models/core/EmployeeCompanies";

export const employeeCompanyFactory = async ({
  employee,
  company,
}: {
  employee: Employee;
  company: Company;
}) => {
  const companyEmployee = new EmployeeCompany();

  companyEmployee.companyId = company.id;
  companyEmployee.employeeId = employee.id;

  return companyEmployee.save();
};
