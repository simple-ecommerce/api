import { SelectQueryBuilder } from "typeorm";
import { Company, Employee } from "../../../models/core";
import { EmployeeCompany } from "../../../models/core/EmployeeCompanies";
import { QueryService } from "../../../utils/classes/query_service/QueryService";

export class CompaniesQuery extends QueryService<Company> {
  query: SelectQueryBuilder<Company>;

  constructor(query?: SelectQueryBuilder<Company>) {
    super();
    this.query = query ?? Company.createQueryBuilder("company");
  }

  byEmployee(employee: number | Employee) {
    const employeeId = typeof employee === "object" ? employee.id : employee;

    this.query = this.query
      .leftJoin("company.employees", "employee")
      .where("employee.id = :employeeId", {
        employeeId,
      });

    return this;
  }
}
