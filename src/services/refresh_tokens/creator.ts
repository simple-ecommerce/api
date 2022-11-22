import jwt from "jsonwebtoken";
import { Customer } from "../../models/core/Customer";
import { Employee } from "../../models/core/Employee";
import { UserType } from "../../types/enums/UserType";
import { RefreshToken } from "../../models/authentication/RefreshToken";
import { Application } from "../../types/enums/Application";

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
    refreshToken.save();

    return refreshToken;
  }

  private generateToken() {
    return jwt.sign(
      {
        userId: this.user.id,
        companyId: this.user.companyId,
        userType: this.userType,
      },
      process.env.REFRESH_TOKEN_SECRET ?? "",
      {
        expiresIn: "7d",
      }
    );
  }
}