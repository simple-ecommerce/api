import { NextFunction, Request, Response } from "express";
import { Token } from "../../../../../../../aliases";
import { RefreshToken } from "../../../../../../../models/authentication";
import * as Services from "../../../../../../../services";

export const revoke = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.body.accessToken;
  const refreshToken = await _findRefreshToken(accessToken);

  if (!refreshToken) {
    res.locals.response = {
      status: 401,
      body: { message: "Invalid access token." },
    };
    return next();
  }

  await _removeRefreshToken(refreshToken);

  res.locals.response = {
    status: 200,
    body: { message: "Token revoked" },
  };
  next();
};

const _findRefreshToken = async (accessToken: Token) => {
  const { refreshTokenId } = await new Services.AccessTokens.Coder(
    accessToken
  ).decode();

  const refreshTokenFinder = new Services.RefreshTokens.Finder(refreshTokenId);
  const refreshToken = await refreshTokenFinder.find();
  return refreshToken;
};

const _removeRefreshToken = async (refreshToken: RefreshToken) => {
  const refreshTokensRemover = new Services.RefreshTokens.Remover(refreshToken);
  await refreshTokensRemover.remove();
};
