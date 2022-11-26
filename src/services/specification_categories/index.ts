import { SpecificationCategoryCreator } from "./creator/Creator";
import { SpecificationCategoryFinder } from "./finder/Finder";
import { SpecificationCategoriesQuery } from "./query/Query";
import { SpecificationCategoryRemover } from "./remover/Remover";
import { SpecificationCategoryUpdater } from "./updater/Updater";

export namespace SpecificationCategories {
  export const Finder = SpecificationCategoryFinder;
  export const Creator = SpecificationCategoryCreator;
  export const Query = SpecificationCategoriesQuery;
  export const Remover = SpecificationCategoryRemover;
  export const Updater = SpecificationCategoryUpdater;
}
