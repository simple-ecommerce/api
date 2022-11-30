import { Middlewares } from "../../../../../middlewares";
import { Controllers } from "../controllers";
import { ValidationSchemas } from "../schemas";

export const companyHandlers = {
  list: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkEmployeeAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Company.list),
    Controllers.Companies.List,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
};
