import { SelectQueryBuilder } from "typeorm";
import {
  Item,
  ItemSpecification,
  Specification,
} from "../../../models/catalog";
import { Company } from "../../../models/core";
import { QueryService } from "../../../utils/classes/query_service/QueryService";

export class ItemSpecificationsQuery extends QueryService<ItemSpecification> {
  query: SelectQueryBuilder<ItemSpecification>;

  constructor(query?: SelectQueryBuilder<ItemSpecification>) {
    super();
    this.query =
      query || ItemSpecification.createQueryBuilder("item_specification");
  }

  bySpecification(specification: Specification) {
    this.query = this.query.where(
      "item_specification.specificationId = :specificationId",
      {
        specificationId: specification.id,
      }
    );

    return this;
  }

  byCompany(company: Company) {
    this.query = this.query
      .leftJoinAndSelect("item_specification.item", "item")
      .where("item.companyId = :companyId", {
        companyId: company.id,
      });

    return this;
  }

  byItem(item: Item | number) {
    const itemId = typeof item === "object" ? item.id : item;

    this.query = this.query.where("item_specification.itemId = :itemId", {
      itemId,
    });

    return this;
  }
}
