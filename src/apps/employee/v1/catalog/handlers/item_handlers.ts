import { Middlewares } from "../../../../../middlewares";
import { ValidationSchemas } from "../../authentication/validation_schemas";
import { Controllers } from "../controllers";

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
