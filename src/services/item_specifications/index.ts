import { ItemSpecificationCreator } from "./creator/Creator";
import { ItemSpecificationFinder } from "./finder/Finder";
import { ItemSpecificationsQuery } from "./query/query";
import { ItemSpecificationRemover } from "./remover/Remover";

export namespace ItemSpecifications {
  export const Query = ItemSpecificationsQuery;
  export const Creator = ItemSpecificationCreator;
  export const Remover = ItemSpecificationRemover;
  export const Finder = ItemSpecificationFinder;
}
