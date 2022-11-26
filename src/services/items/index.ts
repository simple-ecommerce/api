import { FinderService } from "../../classes/finder_service/FinderService";
import { Item } from "../../models/catalog";
import { ItemCreator } from "./creator/Creator";
import { ItemsQuery } from "./query/Query";
import { ItemRemover } from "./remover/Remover";
import { ItemUpdater } from "./updater/Updater";

export namespace Items {
  export const Finder = FinderService(Item);
  export const Creator = ItemCreator;
  export const Query = ItemsQuery;
  export const Remover = ItemRemover;
  export const Updater = ItemUpdater;
}
