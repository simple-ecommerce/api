import { FinderService } from "../../classes/finder_service/FinderService";
import { SpecificationCategory } from "../../models/catalog";
import { SpecificationCategoryCreator } from "./creator/Creator";
import { SpecificationCategoriesQuery } from "./query/Query";
import { SpecificationCategoryRemover } from "./remover/Remover";
import { SpecificationCategoryUpdater } from "./updater/Updater";

export namespace SpecificationCategories {
  export const Finder = FinderService(SpecificationCategory);
  export const Creator = SpecificationCategoryCreator;
  export const Query = SpecificationCategoriesQuery;
  export const Remover = SpecificationCategoryRemover;
  export const Updater = SpecificationCategoryUpdater;
}
