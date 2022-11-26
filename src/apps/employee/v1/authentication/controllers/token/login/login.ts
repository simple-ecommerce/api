import { NextFunction, Request, Response } from "express";
import { Id } from "../../../../../../../aliases";
import * as Services from "../../../../../../../services";
import * as Models from "../../../../../../../models";
import { UserType } from "../../../../../../../types/enums/UserType";

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
      body: { message: "Invalid email or password" },
    };
    return next();
  }

  const employee = await _findEmployee({ company, email });

  if (!employee) {
    res.locals.response = {
      status: 401,
      body: { message: "Invalid email or password" },
    };
    next();
    return;
  }
  try {
    await _validateEmployeeCompany({ company, employee, res });
    await _validateEmployeePassword({ password, employee, res });
  } catch (error) {
    res.locals.response = {
      status: 401,
      body: { message: "Invalid email or password" },
    };
    next();
    return;
  }

  const { refreshToken, accessToken } = await _createTokens({
    employee,
    company,
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

const _findEmployee = async ({
  company,
  email,
}: {
  company: Models.Core.Company;
  email: string;
}) => {
  const employeesQuery = new Services.Employees.Query();
  const employee = await employeesQuery.byCompany(company).byEmail(email).one();

  return employee;
};

const _validateEmployeeCompany = async ({
  company,
  employee,
  res,
}: {
  company: Models.Core.Company;
  employee: Models.Core.Employee;
  res: Response;
}) => {
  if (employee.companyId !== company.id) {
    res.locals.response = {
      status: 401,
      body: { message: "Invalid email or password" },
    };
    throw new Error("Invalid email or password");
  }
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
  company,
}: {
  employee: Models.Core.Employee;
  company: Models.Core.Company;
}) => {
  const refreshTokenCreator = new Services.RefreshTokens.Creator({
    user: employee,
    userType: UserType.EMPLOYEE,
  });
  const refreshToken = await refreshTokenCreator.create();

  const accessTokenCoder = new Services.AccessTokens.Coder();
  const accessToken = await accessTokenCoder.encode({
    companyId: company.id,
    refreshTokenId: refreshToken.id,
    userId: employee.id,
    userType: UserType.EMPLOYEE,
  });

  return { refreshToken: refreshToken.token, accessToken };
};
