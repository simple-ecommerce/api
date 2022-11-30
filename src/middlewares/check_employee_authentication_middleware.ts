import { NextFunction, Request, Response } from "express";
import { AccessTokens, Companies, Customers, Employees } from "../services";

export const checkEmployeeAuthenticationMiddleware = async (
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

  const companyId: number = (() => {
    if (req.method === "GET" || req.method === "DELETE") {
      return Number(req.query.companyId);
    }
    return req.body.companyId;
  })();

  //append company to request
  const companyFinder = new Companies.Finder(companyId);
  const company = await companyFinder.find();

  if (!company)
    return res.sendStatus(404).json({ message: "Couldn't find company" });

  res.locals = {
    ...res.locals,
    company,
  };

  //append employee to request
  const employee = await new Employees.Finder(payload.userId).find();
  if (!employee) return res.sendStatus(403);

  res.locals = {
    ...res.locals,
    employee,
  };

  if (!employee.companies.map((company) => company.id).includes(company?.id))
    return res.sendStatus(403);

  next();
};
