import { RefreshTokensCreator } from "./creator";
import { RefreshTokensFinder } from "./finder";
import { RefreshTokensRemover } from "./remover";
import { Query as RequestTokensQuery } from "./query";
import { Coder as RequestTokensCoder } from "./coder/coder";

export namespace RefreshTokens {
  export const Remover = RefreshTokensRemover;
  export const Finder = RefreshTokensFinder;
  export const Creator = RefreshTokensCreator;
  export const Query = RequestTokensQuery;
  export const Coder = RequestTokensCoder;
}
