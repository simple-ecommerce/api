import { Router } from "express";
import { authorizationRouter } from "./routers/authorization_router";
import { catalogRouter } from "./routers/catalog_router";

export const customerRouter: Router = Router();

customerRouter.use("/authorization", authorizationRouter);
customerRouter.use("/catalog", catalogRouter);
