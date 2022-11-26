import { FinderService } from "../../classes/finder_service/FinderService";
import { UpdaterService } from "../../classes/updater_service/UpdaterService";
import { SpecificationCategory } from "../../models/catalog";
import { SpecificationCategoryCreator } from "./creator/Creator";
import { SpecificationCategoriesQuery } from "./query/Query";
import { SpecificationCategoryRemover } from "./remover/Remover";

export namespace SpecificationCategories {
  export const Finder = FinderService(SpecificationCategory);
  export const Creator = SpecificationCategoryCreator;
  export const Query = SpecificationCategoriesQuery;
  export const Remover = SpecificationCategoryRemover;
  export const Updater = UpdaterService<
    "name" | "description" | "internalName",
    typeof SpecificationCategory
  >(SpecificationCategory);
}
