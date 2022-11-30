import jwt from "jsonwebtoken";
import { Token } from "../../../utils/aliases";
import { AccessTokenPayload } from "../../../utils/types/interfaces/AccessTokenPayload";

const ERRORS = {
  INVALID_TOKEN: new Error("Invalid token"),
};

export class Coder {
  accessToken: Token;

  static ERRORS = ERRORS;

  constructor(accessToken?: string) {
    if (accessToken) {
      this.accessToken = accessToken;
    }
  }

  async encode({
    userId,
    refreshTokenId,
    userType,
  }: AccessTokenPayload): Promise<Token> {
    const token = jwt.sign(
      { userId, refreshTokenId, userType },
      process.env.ACCESS_TOKEN_SECRET ?? "",
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION ?? "",
      }
    );
    this.accessToken = token;

    return token;
  }

  async decode(): Promise<AccessTokenPayload> {
    if (!(await this.validate())) {
      throw new Error("Invalid token");
    }

    const decoded = jwt.decode(this.accessToken, {
      json: true,
    }) as AccessTokenPayload;

    if (!decoded.refreshTokenId || !decoded.userId || !decoded.userType) {
      throw new Error("Invalid token");
    }
    return decoded as AccessTokenPayload;
  }

  private async validate() {
    try {
      jwt.verify(this.accessToken, process.env.ACCESS_TOKEN_SECRET ?? "");

      return true;
    } catch (err) {
      return false;
    }
  }
}
