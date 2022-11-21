import { NextFunction, Request, Response } from "express";
import { RefreshToken } from "../../../../../../models/authentication";
import * as Services from "../../../../../../services";
import { UserType } from "../../../../../../types/enums/UserType";

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.body.refreshToken;
  const refreshToken = await _findRefreshToken(token);

  await _validateRefreshToken({ refreshToken, res });

  const accessToken = await _generateAccessToken({ refreshToken });

  res.locals = {
    status: 201,
    body: { accessToken },
  };
  next();
};

const _findRefreshToken = async (token: string) => {
  const refreshToken = await new Services.RefreshTokens.Query()
    .byToken(token)
    .one();

  return refreshToken;
};

const _generateAccessToken = async ({
  refreshToken,
}: {
  refreshToken: RefreshToken;
}) => {
  const accessTokenCoder = new Services.AccessTokens.Coder();
  const customer = await new Services.Customers.Finder(
    refreshToken.customerId
  ).find();

  const accessToken = await accessTokenCoder.encode({
    userId: refreshToken.customerId,
    refreshTokenId: refreshToken.id,
    companyId: customer.companyId,
    userType: UserType.CUSTOMER,
  });

  return accessToken;
};

const _validateRefreshToken = async ({
  refreshToken,
  res,
}: {
  refreshToken: RefreshToken;
  res: Response;
}) => {
  if (
    !(await new Services.RefreshTokens.Coder(refreshToken.token).validate())
  ) {
    res.sendStatus(401);
  }
};
