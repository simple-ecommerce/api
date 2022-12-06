import { SelectQueryBuilder } from "typeorm";
import { Item, ItemSpecification } from "../../../models/catalog";
import { QueryService } from "../../../utils/classes/query_service/QueryService";

export class ItemSpecificationsQuery extends QueryService<ItemSpecification> {
  query: SelectQueryBuilder<ItemSpecification>;

  constructor(query?: SelectQueryBuilder<ItemSpecification>) {
    super();
    this.query =
      query || ItemSpecification.createQueryBuilder("item_specification");
  }

  byItem(item: Item | number) {
    const itemId = typeof item === "object" ? item.id : item;

    this.query = this.query.where("item_specification.itemId = :itemId", {
      itemId,
    });

    return this;
  }
}
