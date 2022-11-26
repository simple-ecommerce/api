import { CustomerQuery } from "./query";
import { CustomerCreator } from "./creator";
import { FinderService } from "../../classes/finder_service/FinderService";
import { Customer } from "../../models/core";

export namespace Customers {
  export const Query = CustomerQuery;
  export const Finder = FinderService(Customer);
  export const Creator = CustomerCreator;
}
