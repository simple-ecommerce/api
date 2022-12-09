import { SelectQueryBuilder } from "typeorm";
import { Id } from "../../../utils/aliases";
import { QueryService } from "../../../utils/classes/query_service/QueryService";
import { Item, SpecificationCategory } from "../../../models/catalog";
import { Company } from "../../../models/core";

export class SpecificationCategoriesQuery extends QueryService<SpecificationCategory> {
  query: SelectQueryBuilder<SpecificationCategory>;

  constructor(query?: SelectQueryBuilder<SpecificationCategory>) {
    super();
    this.query =
      query ??
      SpecificationCategory.createQueryBuilder("specificationCategory");
  }

  byCompany(company: Company | Id) {
    const companyId = typeof company === "object" ? company.id : company;

    this.query = this.query.where(
      "specificationCategory.companyId = :companyId",
      {
        companyId,
      }
    );

    return this;
  }

  byId(id: Id) {
    this.query = this.query.where("specificationCategory.id = :id", { id });

    return this;
  }

  byItem(item?: Item | Id) {
    if (!item) return this;

    const itemId = typeof item === "object" ? item.id : item;

    this.query = this.query
      .leftJoinAndSelect(
        "specificationCategory.specifications",
        "specifications"
      )
      .leftJoinAndSelect(
        "specifications.itemSpecifications",
        "itemSpecifications"
      )
      .leftJoin("specifications.items", "item")
      .where("item.id = :itemId", { itemId });

    return this;
  }
}
