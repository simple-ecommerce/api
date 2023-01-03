import { Middlewares } from "../../../../../middlewares";
import { Controllers } from "../controllers";
import { itemSchemas } from "../schemas/item_schemas";

export const itemHandlers = {
  list: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.validateSchema(itemSchemas.list),
    Controllers.Item.List,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
};
