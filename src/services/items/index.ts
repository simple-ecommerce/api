import { FinderService } from "../../utils/mixins/finder_service/FinderService";
import { RemoverService } from "../../utils/mixins/remover_service/RemoverService";
import { UpdaterService } from "../../utils/mixins/updater_service/UpdaterService";
import { Item } from "../../models/catalog";
import { ItemCreator } from "./creator/Creator";
import { ItemsQuery } from "./query/Query";

export namespace Items {
  export const Finder = FinderService(Item);
  export const Creator = ItemCreator;
  export const Query = ItemsQuery;
  export const Remover = RemoverService(Item);
  export const Updater = UpdaterService<
    | "name"
    | "shortDescription"
    | "longDescription"
    | "price"
    | "sku"
    | "upc"
    | "ean"
    | "gtin"
    | "brand",
    typeof Item
  >(Item);
}
