import jwt from "jsonwebtoken";
import { Token } from "../../aliases";
import { AccessTokenPayload } from "../../types/interfaces/AccessTokenPayload";

export class Coder {
  accessToken: Token;

  constructor(accessToken?: string) {
    if (accessToken) {
      this.accessToken = accessToken;
    }
  }

  async validate() {
    try {
      jwt.verify(this.accessToken, process.env.ACCESS_TOKEN_SECRET ?? "");
      return true;
    } catch {
      return false;
    }
  }

  async encode({
    userId,
    refreshTokenId,
    companyId,
  }: AccessTokenPayload): Promise<Token> {
    console.log({ userId, refreshTokenId, companyId });
    return jwt.sign(
      { userId, refreshTokenId, companyId },
      process.env.ACCESS_TOKEN_SECRET ?? "",
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION ?? "",
      }
    );
  }

  async decode(): Promise<AccessTokenPayload> {
    const decoded = jwt.decode(this.accessToken, {
      json: true,
    }) as AccessTokenPayload;
    console.log({ decoded });
    if (!decoded.companyId || !decoded.refreshTokenId || !decoded.userId)
      throw new Error("Invalid access token");

    return decoded as AccessTokenPayload;
  }
}
