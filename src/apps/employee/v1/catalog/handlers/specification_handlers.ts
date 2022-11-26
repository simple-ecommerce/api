import { Middlewares } from "../../../../../middlewares";
import { Controllers } from "../controllers";
import { ValidationSchemas } from "../validation_schemas";

export const specificationHandlers = {
  list: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkUserAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Specification.list),
    Controllers.Specification.List,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  create: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkUserAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Specification.create),
    Controllers.Specification.Create,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  show: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkUserAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Specification.show),
    Controllers.Specification.Show,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  update: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkUserAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Specification.update),
    Controllers.Specification.Update,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  remove: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkUserAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Specification.remove),
    Controllers.Specification.Remove,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
};
