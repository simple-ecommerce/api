import { Router } from "express";
import { authorizationRouter } from "./routers/authorization_router";
import { catalogRouter } from "./routers/catalog_router";
import { coreRouter } from "./routers/core_router";

export const employeeRouter: Router = Router();

employeeRouter.use("/authorization", authorizationRouter);
employeeRouter.use("/catalog", catalogRouter);
employeeRouter.use("/core", coreRouter);
