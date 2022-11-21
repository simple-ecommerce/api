import { RefreshToken } from "../../models/authentication";
import { Customer } from "../../models/core";
import { customerFactory } from "./customer_factory";
import jwt from "jsonwebtoken";
import { Application } from "../../types/enums/Application";

export const refreshTokenFactory = async ({
  customer,
  token,
}: {
  customer?: Customer;
  token?: string;
} = {}) => {
  const refreshToken = new RefreshToken();
  refreshToken.token =
    token ??
    jwt.sign(
      { application: Application.CUSTOMER_WEB_APP },
      process.env.REFRESH_TOKEN_SECRET ?? "secret",
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      }
    );
  refreshToken.customer = customer ?? (await customerFactory());

  await refreshToken.save();

  return refreshToken;
};
