import { SpecificationCategoryFinder } from "./finder/Finder";
import { SpecificationCategoriesQuery } from "./query/Query";
import { SpecificationCategoryRemover } from "./remover/Remover";

export namespace SpecificationCategories {
  export const Finder = SpecificationCategoryFinder;
  //   export const Creator = SpecificationCategoryCreator;
  export const Query = SpecificationCategoriesQuery;
  export const Remover = SpecificationCategoryRemover;
  //   export const Updater = SpecificationCategoryUpdater;
}
