import { FinderService } from "../../utils/mixins/finder_service/FinderService";
import { ItemSpecification } from "../../models/catalog";
import { ItemSpecificationCreator } from "./creator/Creator";
import { ItemSpecificationsQuery } from "./query/query";
import { ItemSpecificationRemover } from "./remover/Remover";

export namespace ItemSpecifications {
  export const Query = ItemSpecificationsQuery;
  export const Creator = ItemSpecificationCreator;
  export const Remover = ItemSpecificationRemover;
  export const Finder = FinderService(ItemSpecification);
}
