import jwt from "jsonwebtoken";
import { Customer } from "../../models/core/Customer";
import { Employee } from "../../models/core/Employee";
import { UserType } from "../../utils/types/enums/UserType";
import { RefreshToken } from "../../models/authentication/RefreshToken";
import { Application } from "../../utils/types/enums/Application";

export class RefreshTokensCreator {
  user: Customer | Employee;
  userType: UserType;

  constructor({
    userType,
    user,
  }: {
    userType: UserType;
    user: Customer | Employee;
  }) {
    this.user = user;
    this.userType = userType;
  }

  async create() {
    const refreshToken = RefreshToken.create({
      token: this.generateToken(),
      reload: false,
      application: Application.CUSTOMER_WEB_APP,
    });
    if (this.userType === UserType.CUSTOMER)
      refreshToken.customerId = this.user.id;
    if (this.userType === UserType.EMPLOYEE)
      refreshToken.employeeId = this.user.id;

    return refreshToken.save();
  }

  private generateToken() {
    return jwt.sign(
      {
        userId: this.user.id,
        userType: this.userType,
      },
      process.env.REFRESH_TOKEN_SECRET ?? "",
      {
        expiresIn: "7d",
      }
    );
  }
}
