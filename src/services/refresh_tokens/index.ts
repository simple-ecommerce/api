import { RefreshTokensCreator } from "./creator";
import { RefreshTokensRemover } from "./remover";
import { RefreshTokensQuery } from "./query";
import { RefreshTokensCoder } from "./coder/coder";
import { RefreshToken } from "../../models/authentication";
import { FinderService } from "../../classes/finder_service/FinderService";

export namespace RefreshTokens {
  export const Remover = RefreshTokensRemover;
  export const Finder = FinderService(RefreshToken);
  export const Creator = RefreshTokensCreator;
  export const Query = RefreshTokensQuery;
  export const Coder = RefreshTokensCoder;
}
