import { RefreshToken } from "../../models/authentication/RefreshToken";

export class RefreshTokensFinder {
  id: number;
  constructor(id: number) {
    this.id = id;
  }

  async find() {
    const refreshToken = await RefreshToken.findOneOrFail({
      where: { id: this.id },
    });

    return refreshToken;
  }
}
