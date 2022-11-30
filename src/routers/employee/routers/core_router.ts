import { Router } from "express";
import { companyHandlers } from "../../../apps/employee/v1/core/handlers/company_handlers";

export const coreRouter = Router();

//companies
coreRouter.get("/companies", ...companyHandlers.list);
