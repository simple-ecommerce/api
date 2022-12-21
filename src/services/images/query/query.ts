import { SelectQueryBuilder } from "typeorm";
import { Item } from "../../../models/catalog";
import { Image } from "../../../models/core";
import { Id } from "../../../utils/aliases";
import { QueryService } from "../../../utils/classes/query_service/QueryService";

export class ImagesQuery {
  query: SelectQueryBuilder<Image>;

  constructor(query?: SelectQueryBuilder<Image>) {
    this.query = query || Image.createQueryBuilder("image");
  }

  byItem(item: Item | Id) {
    const itemId = typeof item === "object" ? item.id : item;

    this.query = this.query.andWhere("image.itemId = :itemId", {
      itemId,
    });

    return this;
  }

  byPosition(position: number) {
    this.query = this.query.where("image.position = :position", {
      position,
    });

    return this;
  }

  all() {
    return this.query.getMany();
  }

  one() {
    return this.query.getOne();
  }
}
