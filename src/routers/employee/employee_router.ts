import { Router } from "express";
import { authorizationRouter } from "./routers/authorization_router";

export const employeeRouter: Router = Router();

employeeRouter.use("/authorization", authorizationRouter);
