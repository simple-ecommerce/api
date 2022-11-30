import { FinderService } from "../../utils/mixins/finder_service/FinderService";
import { Company } from "../../models/core";
import { CompanyCreator } from "./creator";
import { CompaniesQuery } from "./query/Query";

export namespace Companies {
  export const Finder = FinderService(Company);
  export const Creator = CompanyCreator;
  export const Query = CompaniesQuery;
}
