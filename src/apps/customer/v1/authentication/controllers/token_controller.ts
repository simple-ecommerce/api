import { NextFunction, Request, Response } from "express";
import * as Services from "../../../../../services";

export namespace TokenController {
  export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password, companyId } = req.body;

      const companyFinder = new Services.Companies.Finder({ id: companyId });
      const company = await companyFinder.find();

      const customersQuery = new Services.Customers.query();
      const customer = await customersQuery
        .byCompany(company)
        .byEmail(email)
        .one();

      if (customer.password === password) {
        res.locals = {
          status: 200,
          body: { refreshToken: "refreshToken", accessToken: "accessToken" },
        };
      } else {
        res.locals = {
          status: 400,
          body: { message: "Invalid email or password" },
        };
      }
    } catch (error) {
      res.locals = {
        status: 500,
        body: error,
      };
    }
    next();
  };
}
