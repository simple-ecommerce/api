import { Router } from "express";
import { authorizationRouter } from "./routers/authorization_router";

export const customerRouter: Router = Router();

customerRouter.use("/authorization", authorizationRouter);
