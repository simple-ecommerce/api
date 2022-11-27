import { RefreshToken } from "../../models/authentication";
import { Customer, Employee } from "../../models/core";
import { customerFactory } from "./customer_factory";
import jwt from "jsonwebtoken";
import { Application } from "../../utils/types/enums/Application";
import { employeeFactory } from "./employee_factory";

export const refreshTokenFactory = async ({
  customer,
  employee,
  token,
  application,
}: {
  customer?: Customer;
  employee?: Employee;
  token?: string;
  application?: Application;
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
  refreshToken.employee = employee ?? (await employeeFactory());
  refreshToken.application = application ?? Application.CUSTOMER_WEB_APP;

  await refreshToken.save();

  return refreshToken;
};
