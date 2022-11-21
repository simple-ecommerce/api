import { CustomerQuery } from "./query";
import { Finder as CustomerFinder } from "./finder";
import { CustomerCreator } from "./creator";

export namespace Customers {
  export const query = CustomerQuery;
  export const Finder = CustomerFinder;
  export const Creator = CustomerCreator;
}
