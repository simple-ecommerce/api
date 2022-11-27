import { SelectQueryBuilder } from "typeorm";
import { Id } from "../../utils/aliases";
import { Company } from "../../models/core/Company";
import { Customer } from "../../models/core/Customer";

export class CustomerQuery {
  private _query: SelectQueryBuilder<Customer>;

  constructor(query?: SelectQueryBuilder<Customer>) {
    this._query = query ?? Customer.createQueryBuilder("customer");
  }

  byCompany(company: Company | Id) {
    const companyId = typeof company === "object" ? company.id : company;

    this._query = this._query.where("customer.companyId = :companyId", {
      companyId,
    });

    return this;
  }

  byEmail(email: string) {
    this._query = this._query.where("customer.email = :email", { email });

    return this;
  }

  one() {
    return this._query.getOne();
  }

  all() {
    return this._query.getMany();
  }
}
