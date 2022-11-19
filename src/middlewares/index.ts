import { transformRequestToCamelCaseMiddleware } from "./transform_request_to_camel_case_middleware";
import { transformResponseToSnakeCaseMiddleware } from "./transform_response_to_snake_case_middleware";
import { sendResponseMiddleware } from "./send_response_middleware";
import { validateSchemaMiddleware } from "./validate_schema_middleware";
import { checkUserAuthenticationMiddleware } from "./check_user_authentication_middleware";

export namespace Middlewares {
  export const validateSchema = validateSchemaMiddleware;
  export const transformRequestToCamelCase =
    transformRequestToCamelCaseMiddleware;
  export const transformResponseToSnakeCase =
    transformResponseToSnakeCaseMiddleware;
  export const sendResponse = sendResponseMiddleware;
  export const checkUserAuthentication = checkUserAuthenticationMiddleware;
}
