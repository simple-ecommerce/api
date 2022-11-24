import { SelectQueryBuilder } from "typeorm";
import { Id } from "../../../aliases";
import { Item } from "../../../models/catalog";
import { Company } from "../../../models/core";

export class ItemsQuery {
  private _query: SelectQueryBuilder<Item>;

  constructor(query?: SelectQueryBuilder<Item>) {
    this._query = query ?? Item.createQueryBuilder("item");
  }

  byCompany(company: Company | Id) {
    const companyId = typeof company === "object" ? company.id : company;

    this._query = this._query.where("item.companyId = :companyId", {
      companyId,
    });

    return this;
  }

  byId(id: Id) {
    this._query = this._query.where("item.id = :id", { id });

    return this;
  }

  one() {
    return this._query.getOne();
  }

  all() {
    return this._query.getMany();
  }
}
