import { FinderService } from "../../classes/finder_service/FinderService";
import { UpdaterService } from "../../classes/updater_service/UpdaterService";
import { Item } from "../../models/catalog";
import { ItemCreator } from "./creator/Creator";
import { ItemsQuery } from "./query/Query";
import { ItemRemover } from "./remover/Remover";

export namespace Items {
  export const Finder = FinderService(Item);
  export const Creator = ItemCreator;
  export const Query = ItemsQuery;
  export const Remover = ItemRemover;
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
