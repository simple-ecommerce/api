import { Middlewares } from "../../../../../middlewares";
import { Controllers } from "../controllers";
import { ValidationSchemas } from "../validation_schemas";

export const itemHandlers = {
  list: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkEmployeeAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Item.list),
    Controllers.Items.List,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  create: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkEmployeeAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Item.create),
    Controllers.Items.Create,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  show: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkEmployeeAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Item.show),
    Controllers.Items.Show,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  update: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkEmployeeAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Item.update),
    Controllers.Items.Update,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  remove: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkEmployeeAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Item.remove),
    Controllers.Items.Remove,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  specifications: {
    list: [
      Middlewares.transformRequestToCamelCase,
      Middlewares.checkEmployeeAuthentication,
      Middlewares.validateSchema(ValidationSchemas.Item.specifications.list),
      Controllers.Items.Specifications.list,
      Middlewares.transformResponseToSnakeCase,
      Middlewares.sendResponse,
    ],
    create: [
      Middlewares.transformRequestToCamelCase,
      Middlewares.checkEmployeeAuthentication,
      Middlewares.validateSchema(ValidationSchemas.Item.specifications.create),
      Controllers.Items.Specifications.create,
      Middlewares.transformResponseToSnakeCase,
      Middlewares.sendResponse,
    ],
    remove: [
      Middlewares.transformRequestToCamelCase,
      Middlewares.checkEmployeeAuthentication,
      Middlewares.validateSchema(ValidationSchemas.Item.specifications.remove),
      Controllers.Items.Specifications.remove,
      Middlewares.transformResponseToSnakeCase,
      Middlewares.sendResponse,
    ],
  },
  images: {
    create: [
      Middlewares.transformRequestToCamelCase,
      Middlewares.checkEmployeeAuthentication,
      Middlewares.uploadImage.array("files", 5),
      Middlewares.validateSchema(ValidationSchemas.Item.images.create),
      Controllers.Items.Images.create,
      Middlewares.transformResponseToSnakeCase,
      Middlewares.sendResponse,
    ],
    update: [
      Middlewares.transformRequestToCamelCase,
      Middlewares.checkEmployeeAuthentication,
      Middlewares.validateSchema(ValidationSchemas.Item.images.update),
      Controllers.Items.Images.update,
      Middlewares.transformResponseToSnakeCase,
      Middlewares.sendResponse,
    ],
    remove: [
      Middlewares.transformRequestToCamelCase,
      Middlewares.checkEmployeeAuthentication,
      Middlewares.validateSchema(ValidationSchemas.Item.images.remove),
      Controllers.Items.Images.remove,
      Middlewares.transformResponseToSnakeCase,
      Middlewares.sendResponse,
    ],
  },
};
