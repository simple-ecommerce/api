import jwt from "jsonwebtoken";
import { Token } from "../../../aliases";
import { Application } from "../../../types/enums/Application";

export class Coder {
  refreshToken?: Token;

  constructor(refreshToken?: Token) {
    if (refreshToken) {
      this.refreshToken = refreshToken;
    }
  }

  async validate() {
    if (!this.refreshToken) throw new Error("Refresh token is not defined");
    try {
      jwt.verify(this.refreshToken, process.env.REFRESH_TOKEN_SECRET ?? "");
      return true;
    } catch {
      return false;
    }
  }

  async encode({ application }: { application: Application }) {
    const token = jwt.sign(
      { application: application ?? Application.CUSTOMER_WEB_APP },
      process.env.REFRESH_TOKEN_SECRET ?? "",
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION ?? "",
      }
    );

    this.refreshToken = token;

    return token;
  }
}
