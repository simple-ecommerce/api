import { ItemSpecificationCreator } from "./creator/Creator";
import { ItemSpecificationsQuery } from "./query/query";

export namespace ItemSpecifications {
  export const Query = ItemSpecificationsQuery;
  export const Creator = ItemSpecificationCreator;
}
