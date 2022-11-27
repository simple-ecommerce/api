import { Response } from "express";
import { Company, Customer, Employee } from "../../../models/core";

export type AuthenticatedHandlerResponse = Response<
  any,
  {
    company: Company;
    employee: Employee;
    customer: Customer;
    response?: {
      status: number;
      body: any;
    };
  }
>;
