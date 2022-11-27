import { SelectQueryBuilder } from "typeorm";
import { Id } from "../../utils/aliases";
import { Company } from "../../models/core/Company";
import { Employee } from "../../models/core/Employee";

export class EmployeeQuery {
  private _query: SelectQueryBuilder<Employee>;

  constructor(query?: SelectQueryBuilder<Employee>) {
    this._query = query ?? Employee.createQueryBuilder("employee");
  }

  byCompany(company: Company | Id) {
    const companyId = typeof company === "object" ? company.id : company;

    this._query = this._query.where("employee.companyId = :companyId", {
      companyId,
    });

    return this;
  }

  byEmail(email: string) {
    this._query = this._query.where("employee.email = :email", { email });

    return this;
  }

  one() {
    return this._query.getOne();
  }

  all() {
    return this._query.getMany();
  }
}
