import { RefreshTokensCreator } from "./creator";
import { RefreshTokensFinder } from "./finder";
import { RefreshTokensRemover } from "./remover";
import { RefreshTokensQuery } from "./query";
import { RefreshTokensCoder } from "./coder/coder";

export namespace RefreshTokens {
  export const Remover = RefreshTokensRemover;
  export const Finder = RefreshTokensFinder;
  export const Creator = RefreshTokensCreator;
  export const Query = RefreshTokensQuery;
  export const Coder = RefreshTokensCoder;
}
