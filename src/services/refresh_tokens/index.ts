import { RefreshTokensCreator } from "./creator";
import { RefreshTokensQuery } from "./query";
import { RefreshTokensCoder } from "./coder/coder";
import { RefreshToken } from "../../models/authentication";
import { FinderService } from "../../classes/finder_service/FinderService";
import { RemoverService } from "../../classes/remover_service/RemoverService";

export namespace RefreshTokens {
  export const Remover = RemoverService(RefreshToken);
  export const Finder = FinderService(RefreshToken);
  export const Creator = RefreshTokensCreator;
  export const Query = RefreshTokensQuery;
  export const Coder = RefreshTokensCoder;
}
