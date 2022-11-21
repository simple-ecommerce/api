import { CustomerQuery } from "./query";
import { CustomerFinder } from "./finder";
import { CustomerCreator } from "./creator";

export namespace Customers {
  export const Query = CustomerQuery;
  export const Finder = CustomerFinder;
  export const Creator = CustomerCreator;
}
