import { NextFunction, Request, Response } from "express";
import { RefreshToken } from "../../../../../../../models/authentication";
import * as Services from "../../../../../../../services";
import { UserType } from "../../../../../../../types/enums/UserType";

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.body.refreshToken;
  try {
    const refreshToken = await _findRefreshToken(token);
    await _validateRefreshToken({ refreshToken, res });
    const accessToken = await _generateAccessToken({ refreshToken });
    res.locals.response = {
      status: 201,
      body: { accessToken },
    };
  } catch (error) {
    res.locals.response = {
      status: 401,
      body: { message: "Invalid refresh token." },
    };
  } finally {
    next();
  }
};

const _findRefreshToken = async (token: string) => {
  const refreshToken = await new Services.RefreshTokens.Query()
    .byToken(token)
    .one();
  if (!refreshToken) throw new Error("Invalid refresh token");

  return refreshToken;
};

const _generateAccessToken = async ({
  refreshToken,
}: {
  refreshToken: RefreshToken;
}) => {
  const accessTokenCoder = new Services.AccessTokens.Coder();
  const employee = await new Services.Employees.Finder(
    refreshToken.employeeId
  ).find();

  if (!employee) {
    throw new Error("Invalid refresh token");
  }

  const accessToken = await accessTokenCoder.encode({
    userId: refreshToken.employeeId,
    refreshTokenId: refreshToken.id,
    companyId: employee.companyId,
    userType: UserType.EMPLOYEE,
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
    throw new Error("Invalid refresh token");
  }
};
