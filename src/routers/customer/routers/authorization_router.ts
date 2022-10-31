import { Router } from "express";
import { tokenHandlers } from "../../../apps/customer/v1/authentication/handlers/token_handlers";

export const authorizationRouter: Router = Router();

authorizationRouter.post("/login", ...tokenHandlers.login);
authorizationRouter.post("/refresh", ...tokenHandlers.refresh);
authorizationRouter.post("/revoke", ...tokenHandlers.revoke);
