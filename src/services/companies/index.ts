import { FinderService } from "../../classes/finder_service/FinderService";
import { Company } from "../../models/core";
import { CompanyCreator } from "./creator";

export namespace Companies {
  export const Finder = FinderService(Company);
  export const Creator = CompanyCreator;
}
