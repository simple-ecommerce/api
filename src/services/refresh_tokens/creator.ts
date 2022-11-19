import jwt from "jsonwebtoken";
import { Customer } from "../../models/core/Customer";
import { Employee } from "../../models/core/Employee";
import { UserType } from "../../types/enums/UserType";
import { RefreshToken } from "../../models/authentication/RefreshToken";

export class RefreshTokensCreator {
  user: Customer | Employee;

  constructor(user: Customer | Employee) {
    this.user = user;
  }

  async create() {
    const refreshToken = new RefreshToken();
    refreshToken.customerId = this.user.id;
    refreshToken.token = this.generateToken();

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
