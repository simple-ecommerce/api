import { RefreshToken } from "../../models/authentication/RefreshToken";

export class RefreshTokensRemover {
  refreshToken: RefreshToken;

  constructor(refreshToken: RefreshToken) {
    this.refreshToken = refreshToken;
  }

  async remove() {
    return this.refreshToken.softRemove();
  }
}
