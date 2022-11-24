import { Middlewares } from "../../../../../middlewares";
import { Controllers } from "../controllers";
import { ValidationSchemas } from "../validation_schemas";

export const itemHandlers = {
  list: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkUserAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Item.list),
    Controllers.Items.List,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  create: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkUserAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Item.create),
    Controllers.Items.Create,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  show: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkUserAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Item.show),
    Controllers.Items.Show,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  update: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkUserAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Item.update),
    Controllers.Items.Update,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  remove: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkUserAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Item.remove),
    Controllers.Items.Remove,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
};
