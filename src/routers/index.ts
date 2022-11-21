import { customerRouter } from "./customer/customer_router";
import { employeeRouter } from "./employee/employee_router";

export namespace Routers {
  export const customer = customerRouter;
  export const employee = employeeRouter;
}
