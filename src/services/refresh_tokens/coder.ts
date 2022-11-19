import jwt from "jsonwebtoken";
import { RefreshToken } from "../../models/authentication/RefreshToken";

export class Coder {
  refreshToken: RefreshToken;

  constructor(refreshToken: RefreshToken) {
    this.refreshToken = refreshToken;
  }

  async validate() {
    try {
      jwt.verify(
        this.refreshToken.token,
        process.env.REFRESH_TOKEN_SECRET ?? ""
      );
      return true;
    } catch {
      return false;
    }
  }

  async encode() {
    return jwt.sign({}, process.env.REFRESH_TOKEN_SECRET ?? "", {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION ?? "",
    });
  }
}
