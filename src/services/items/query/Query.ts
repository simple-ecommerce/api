import { SelectQueryBuilder } from "typeorm";
import { Id } from "../../../utils/aliases";
import { QueryService } from "../../../utils/classes/query_service/QueryService";
import { Item } from "../../../models/catalog";
import { Company } from "../../../models/core";

export class ItemsQuery extends QueryService<Item> {
  query: SelectQueryBuilder<Item>;

  constructor(query?: SelectQueryBuilder<Item>) {
    super();
    this.query = query ?? Item.createQueryBuilder("item");
  }

  byCompany(company: Company | Id) {
    const companyId = typeof company === "object" ? company.id : company;

    this.query = this.query.where("item.companyId = :companyId", {
      companyId,
    });

    return this;
  }

  byId(id: Id) {
    this.query = this.query.where("item.id = :id", { id });

    return this;
  }
}
