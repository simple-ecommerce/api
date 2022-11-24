import { ItemCreator } from "./creator/Creator";
import { ItemFinder } from "./finder/Finder";
import { ItemsQuery } from "./query/Query";
import { ItemRemover } from "./remover/Remover";
import { ItemUpdater } from "./updater/Updater";

export namespace Items {
  export const Finder = ItemFinder;
  export const Creator = ItemCreator;
  export const Query = ItemsQuery;
  export const Remover = ItemRemover;
  export const Updater = ItemUpdater;
}
