import { Middlewares } from "../../../../../middlewares";
import { Controllers } from "../controllers";
import { ValidationSchemas } from "../validation_schemas";

export const tokenHandlers = {
  login: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.validateSchema(ValidationSchemas.Token.login),
    Controllers.Token.Login,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  refresh: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.validateSchema(ValidationSchemas.Token.refresh),
    Controllers.Token.Refresh,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  revoke: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkEmployeeAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Token.revoke),
    Controllers.Token.Revoke,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
};
