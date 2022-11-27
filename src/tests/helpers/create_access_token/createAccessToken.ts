import { Factories } from "../../../database/factories";
import { Customer, Employee } from "../../../models/core";
import * as Services from "../../../services";
import { UserType } from "../../../utils/types/enums/UserType";

export const createAccessToken = async ({
  employee,
  customer,
}: {
  employee?: Employee;
  customer?: Customer;
}) => {
  if (employee) {
    const refreshToken = await Factories.RefreshToken({ employee });
    return await new Services.AccessTokens.Coder().encode({
      companyId: employee.companyId,
      refreshTokenId: refreshToken.id,
      userId: employee.id,
      userType: UserType.EMPLOYEE,
    });
  }
  if (customer) {
    const refreshToken = await Factories.RefreshToken({ customer });
    return await new Services.AccessTokens.Coder().encode({
      companyId: customer.companyId,
      refreshTokenId: refreshToken.id,
      userId: customer.id,
      userType: UserType.CUSTOMER,
    });
  }
  throw new Error("Invalid user type");
};
