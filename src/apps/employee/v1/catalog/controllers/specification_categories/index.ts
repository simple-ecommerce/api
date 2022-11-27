import { create } from "./create/create";
import { list } from "./list/list";
import { remove } from "./remove/remove";
import { show } from "./show/show";
import { update } from "./update/update";
import * as options from "./options/index";

export namespace SpecificationCategoryControllers {
  export const Create = create;
  export const Update = update;
  export const List = list;
  export const Show = show;
  export const Remove = remove;
  export const Options = options;
}
