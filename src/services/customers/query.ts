import { SelectQueryBuilder } from "typeorm";
import { Id } from "../../aliases";
import { Company } from "../../models/core/Company";
import { Customer } from "../../models/core/Customer";

export class CustomerQuery {
  private _query: SelectQueryBuilder<Customer>;

  constructor(query?: SelectQueryBuilder<Customer>) {
    this._query = query ?? Customer.createQueryBuilder("customer");
  }

  byCompany(company: Company | Id) {
    const companyId = company instanceof Company ? company?.id : company;
    this._query = this._query.andWhere("customer.companyId = :companyId", {
      companyId,
    });

    return this;
  }

  byEmail(email: string) {
    this._query = this._query.andWhere("customer.email = :email", { email });

    return this;
  }

  one() {
    return this._query.getOneOrFail();
  }

  all() {
    return this._query.getMany();
  }
}
