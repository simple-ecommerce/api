import { NextFunction, Request, Response } from "express";
import { AccessTokens, Companies, Customers } from "../services";

export const checkCustomerAuthenticationMiddleware = async (
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

  try {
    const payload = await accessTokenCoder.decode();

    //append customer to request
    const customerFinder = new Customers.Finder(payload.userId);
    const customer = await customerFinder.find();
    if (!customer) {
      return res.sendStatus(403);
    }

    res.locals = {
      ...res.locals,
      customer,
    };

    //append company to request
    const companyFinder = new Companies.Finder(customer.companyId);
    const company = await companyFinder.find();
    res.locals = {
      ...res.locals,
      company,
    };

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
