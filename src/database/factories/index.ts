import { companyFactory } from "./company_factory";
import { customerFactory } from "./customer_factory";
import { employeeFactory } from "./employee_factory";
import { itemFactory } from "./item_factory";
import { refreshTokenFactory } from "./refresh_token_factory";

export namespace Factories {
  export const RefreshToken = refreshTokenFactory;
  export const Customer = customerFactory;
  export const Employee = employeeFactory;
  export const Item = itemFactory;
  export const Company = companyFactory;
}
