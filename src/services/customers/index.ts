import { CustomerQuery } from "./query";
import { Finder as CustomerFinder } from "./finder";

export namespace Customers {
  export const query = CustomerQuery;
  export const Finder = CustomerFinder;
}
