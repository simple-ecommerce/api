import { SelectQueryBuilder } from "typeorm";
import { Id } from "../../../aliases";
import { QueryService } from "../../../utils/classes/query_service/QueryService";
import { SpecificationCategory } from "../../../models/catalog";
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
}
