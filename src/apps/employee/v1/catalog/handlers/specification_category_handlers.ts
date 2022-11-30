import { Middlewares } from "../../../../../middlewares";
import { Controllers } from "../controllers";
import { ValidationSchemas } from "../validation_schemas";

export const specificationCategoriesHandlers = {
  list: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkEmployeeAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Specification.list),
    Controllers.SpecificationCategories.List,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  create: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkEmployeeAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Specification.create),
    Controllers.SpecificationCategories.Create,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  show: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkEmployeeAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Specification.show),
    Controllers.SpecificationCategories.Show,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  update: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkEmployeeAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Specification.update),
    Controllers.SpecificationCategories.Update,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  remove: [
    Middlewares.transformRequestToCamelCase,
    Middlewares.checkEmployeeAuthentication,
    Middlewares.validateSchema(ValidationSchemas.Specification.remove),
    Controllers.SpecificationCategories.Remove,
    Middlewares.transformResponseToSnakeCase,
    Middlewares.sendResponse,
  ],
  specifications: {
    create: [
      Middlewares.transformRequestToCamelCase,
      Middlewares.checkEmployeeAuthentication,
      Middlewares.validateSchema(
        ValidationSchemas.Specification.options.create
      ),
      Controllers.SpecificationCategories.Specifications.create,
      Middlewares.transformResponseToSnakeCase,
      Middlewares.sendResponse,
    ],
    remove: [
      Middlewares.transformRequestToCamelCase,
      Middlewares.checkEmployeeAuthentication,
      Middlewares.validateSchema(
        ValidationSchemas.Specification.options.remove
      ),
      Controllers.SpecificationCategories.Specifications.remove,
      Middlewares.transformResponseToSnakeCase,
      Middlewares.sendResponse,
    ],
  },
};
