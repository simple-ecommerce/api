import { SelectQueryBuilder } from "typeorm";
import { Item } from "../../../models/catalog";
import { Image } from "../../../models/core";
import { Id } from "../../../utils/aliases";
import { QueryService } from "../../../utils/classes/query_service/QueryService";

export class ImagesQuery extends QueryService<Image> {
  query: SelectQueryBuilder<Image>;

  constructor(query?: SelectQueryBuilder<Image>) {
    super();
    this.query = query || Image.createQueryBuilder("image");
  }

  byItem(item: Item | Id) {
    const itemId = typeof item === "object" ? item.id : item;

    this.query = this.query.where("image.itemId = :itemId", {
      itemId,
    });

    return this;
  }

  byIndex(index: number) {
    this.query = this.query.where("image.index = :index", {
      index,
    });

    return this;
  }
}
