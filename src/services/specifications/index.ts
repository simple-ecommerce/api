import { Specification } from "../../models/catalog";
import { FinderService } from "../../utils/mixins/finder_service/FinderService";
import { RemoverService } from "../../utils/mixins/remover_service/RemoverService";
import { SpecificationCreator } from "./creator/Creator";

export namespace Specifications {
  export const Creator = SpecificationCreator;
  export const Finder = FinderService(Specification);
  export const Remover = RemoverService(Specification);
}
