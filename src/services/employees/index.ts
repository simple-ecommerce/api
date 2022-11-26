import { FinderService } from "../../mixins/finder_service/FinderService";
import { Employee } from "../../models/core";
import { EmployeeQuery } from "./query";

export namespace Employees {
  export const Finder = FinderService(Employee);
  export const Query = EmployeeQuery;
}
