import { transformRequestToCamelCaseMiddleware } from "./transform_request_to_camel_case_middleware";
import { transformResponseToSnakeCaseMiddleware } from "./transform_response_to_snake_case_middleware";
import { sendResponseMiddleware } from "./send_response_middleware";
import { validateSchemaMiddleware } from "./validate_schema_middleware";
import { checkEmployeeAuthenticationMiddleware } from "./check_employee_authentication_middleware";
import { checkCustomerAuthenticationMiddleware } from "./check_customer_authentication_middleware";
import { uploadImageMiddleware } from "./upload_image_middleware";

export namespace Middlewares {
  export const validateSchema = validateSchemaMiddleware;
  export const transformRequestToCamelCase =
    transformRequestToCamelCaseMiddleware;
  export const transformResponseToSnakeCase =
    transformResponseToSnakeCaseMiddleware;
  export const sendResponse = sendResponseMiddleware;
  export const checkEmployeeAuthentication =
    checkEmployeeAuthenticationMiddleware;
  export const checkCustomerAuthentication =
    checkCustomerAuthenticationMiddleware;
  export const uploadImage = uploadImageMiddleware;
}
