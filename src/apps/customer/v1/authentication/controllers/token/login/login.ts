import { NextFunction, Request, Response } from "express";
import { Id } from "../../../../../../../utils/aliases";
import * as Services from "../../../../../../../services";
import * as Models from "../../../../../../../models";
import { UserType } from "../../../../../../../utils/types/enums/UserType";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, companyId } = req.body;
  const company = await _findCompany(companyId);
  if (!company) {
    res.locals.response = {
      status: 401,
      body: { message: "Company not found" },
    };

    return next();
  }

  const customer = await _findCustomer({ company, email });
  if (!customer) {
    res.locals.response = {
      status: 401,
      body: { message: "Invalid email or password" },
    };
    return next();
  }
  try {
    await _validateCustomerCompany({ company, customer, res });
    await _validateCustomerPassword({ password, customer, res });
  } catch (error) {
    return next();
  }

  const { refreshToken, accessToken } = await _createTokens({
    customer,
    company,
  });
  res.locals.response = {
    status: 200,
    body: { refreshToken, accessToken },
  };

  next();
};

const _findCompany = async (id: Id) => {
  const company = new Services.Companies.Finder(id).find();

  return company;
};

const _findCustomer = async ({
  company,
  email,
}: {
  company: Models.Core.Company;
  email: string;
}) => {
  const customersQuery = new Services.Customers.Query();
  const customer = await customersQuery.byCompany(company).byEmail(email).one();

  return customer;
};

const _validateCustomerCompany = async ({
  company,
  customer,
  res,
}: {
  company: Models.Core.Company;
  customer: Models.Core.Customer;
  res: Response;
}) => {
  if (customer.companyId !== company.id) {
    res.locals.response = {
      status: 401,
      body: { message: "Invalid email or password" },
    };
    throw new Error("Invalid email or password");
  }
};

const _validateCustomerPassword = async ({
  password,
  customer,
  res,
}: {
  password: string;
  customer: Models.Core.Customer;
  res: Response;
}) => {
  const matches = await Services.Passwords.Hasher.compare({
    password,
    hash: customer.password,
  });
  if (matches) return;

  if (customer.password !== password) {
    res.locals.response = {
      status: 401,
      body: { message: "Invalid email or password" },
    };
    throw new Error("Invalid email or password");
  }
};

const _createTokens = async ({
  customer,
  company,
}: {
  customer: Models.Core.Customer;
  company: Models.Core.Company;
}) => {
  const refreshTokenCreator = new Services.RefreshTokens.Creator({
    user: customer,
    userType: UserType.CUSTOMER,
  });
  const refreshToken = await refreshTokenCreator.create();

  const accessTokenCoder = new Services.AccessTokens.Coder();
  const accessToken = await accessTokenCoder.encode({
    refreshTokenId: refreshToken.id,
    userId: customer.id,
    userType: UserType.CUSTOMER,
  });

  return { refreshToken: refreshToken.token, accessToken };
};
