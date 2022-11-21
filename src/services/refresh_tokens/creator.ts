import jwt from "jsonwebtoken";
import { Customer } from "../../models/core/Customer";
import { Employee } from "../../models/core/Employee";
import { UserType } from "../../types/enums/UserType";
import { RefreshToken } from "../../models/authentication/RefreshToken";
import { Application } from "../../types/enums/Application";

export class RefreshTokensCreator {
  user: Customer | Employee;

  constructor({ user }: { user: Customer | Employee }) {
    this.user = user;
  }

  async create() {
    const refreshToken = RefreshToken.create({
      customerId: this.user.id,
      token: this.generateToken(),
      reload: false,
      application: Application.CUSTOMER_WEB_APP,
    });
    refreshToken.save();

    return refreshToken;
  }

  private generateToken() {
    return jwt.sign(
      {
        userId: this.user.id,
        companyId: this.user.companyId,
        userType: UserType.CUSTOMER,
      },
      process.env.REFRESH_TOKEN_SECRET ?? "",
      {
        expiresIn: "7d",
      }
    );
  }
}
