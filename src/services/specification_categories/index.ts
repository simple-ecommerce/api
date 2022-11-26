import { FinderService } from "../../mixins/finder_service/FinderService";
import { RemoverService } from "../../mixins/remover_service/RemoverService";
import { UpdaterService } from "../../mixins/updater_service/UpdaterService";
import { SpecificationCategory } from "../../models/catalog";
import { SpecificationCategoryCreator } from "./creator/Creator";
import { SpecificationCategoriesQuery } from "./query/Query";

export namespace SpecificationCategories {
  export const Finder = FinderService(SpecificationCategory);
  export const Creator = SpecificationCategoryCreator;
  export const Query = SpecificationCategoriesQuery;
  export const Remover = RemoverService(SpecificationCategory);
  export const Updater = UpdaterService<
    "name" | "description" | "internalName",
    typeof SpecificationCategory
  >(SpecificationCategory);
}
