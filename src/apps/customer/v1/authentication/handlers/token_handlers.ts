import { Request, Response } from "express";
import { Middlewares } from "../../../../../middlewares";
import { ValidationSchemas } from "../validation_schemas";
import { TokenController } from "../controllers/token_controller";

export const tokenHandlers = {
  login: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.validateSchema(ValidationSchemas.token.login),
    TokenController.login,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  refresh: [
    (req: Request, res: Response) => {
      res.send("refresh");
    },
  ],
  revoke: [
    (req: Request, res: Response) => {
      res.send("revoke");
    },
  ],
};
