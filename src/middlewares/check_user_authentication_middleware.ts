import { NextFunction, Request, Response } from "express";
import { Id } from "../aliases";
import { AccessTokens, Companies, Customers, Employees } from "../services";
import { UserType } from "../types/enums/UserType";

export const checkUserAuthenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //validate token and get payload
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader?.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  const accessTokenCoder = new AccessTokens.Coder(token);
  const payload = await accessTokenCoder.decode();

  //append company to request
  const companyFinder = new Companies.Finder({ id: payload.companyId });
  const company = companyFinder.find();
  // res.locals.meta.company = company;
  res.locals = {
    ...res.locals,
    meta: {
      company,
    },
  };

  //append customer to request
  if (payload.userType === UserType.CUSTOMER) {
    const customerFinder = new Customers.Finder(payload.userId);
    const customer = await customerFinder.find();
    if (!customer) {
      return res.sendStatus(403);
    }
    if (customer.companyId !== payload.companyId) {
      return res.sendStatus(403);
    }
    // res.locals.meta.customer = customer;
    res.locals = {
      ...res.locals,
      meta: {
        customer,
      },
    };
  }

  //append employee to request
  if (payload.userType === UserType.EMPLOYEE) {
    Employees;
    const employeeFinder = new Employees.Finder(payload.userId);
    const employee = await employeeFinder.find();
    if (!employee) {
      return res.sendStatus(403);
    }
    if (employee.companyId !== payload.companyId) {
      return res.sendStatus(403);
    }
    res.locals.meta.employee = employee;
    res.locals = {
      ...res.locals,
      meta: {
        employee,
      },
    };
  }

  next();
};
