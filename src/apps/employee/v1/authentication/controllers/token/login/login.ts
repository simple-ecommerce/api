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

  const employee = await _findEmployee({ email });

  if (!employee) {
    res.locals.response = {
      status: 401,
      body: { message: "Invalid email or password" },
    };

    return next();
  }
  try {
    await _validateEmployeePassword({ password, employee, res });
  } catch (error) {
    res.locals.response = {
      status: 401,
      body: { message: "Invalid email or password" },
    };

    return next();
  }

  const { refreshToken, accessToken } = await _createTokens({
    employee,
  });
  res.locals.response = {
    status: 200,
    body: { refreshToken, accessToken },
  };

  next();
};

const _findCompany = async (id: Id) => {
  const companyFinder = new Services.Companies.Finder(id);
  const company = await companyFinder.find();

  return company;
};

const _findEmployee = async ({ email }: { email: string }) => {
  const employeesQuery = new Services.Employees.Query();
  const employee = await employeesQuery.byEmail(email).one();

  return employee;
};

const _validateEmployeePassword = async ({
  password,
  employee,
  res,
}: {
  password: string;
  employee: Models.Core.Employee;
  res: Response;
}) => {
  const matches = await Services.Passwords.Hasher.compare({
    password,
    hash: employee.password,
  });
  if (matches) return;

  if (employee.password !== password) {
    res.locals.response = {
      status: 401,
      body: { message: "Invalid email or password" },
    };
    throw new Error("Invalid email or password");
  }
};

const _createTokens = async ({
  employee,
}: {
  employee: Models.Core.Employee;
}) => {
  const refreshTokenCreator = new Services.RefreshTokens.Creator({
    user: employee,
    userType: UserType.EMPLOYEE,
  });
  const refreshToken = await refreshTokenCreator.create();

  const accessTokenCoder = new Services.AccessTokens.Coder();
  const accessToken = await accessTokenCoder.encode({
    refreshTokenId: refreshToken.id,
    userId: employee.id,
    userType: UserType.EMPLOYEE,
  });

  return { refreshToken: refreshToken.token, accessToken };
};
