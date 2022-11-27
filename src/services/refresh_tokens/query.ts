import { SelectQueryBuilder } from "typeorm";
import { Token } from "../../utils/aliases";
import { RefreshToken } from "../../models/authentication";

export class RefreshTokensQuery {
  private _query: SelectQueryBuilder<RefreshToken>;

  constructor(query?: SelectQueryBuilder<RefreshToken>) {
    this._query = query ?? RefreshToken.createQueryBuilder("refreshToken");
  }

  byToken(token: Token) {
    this._query = this._query.where("refreshToken.token = :token", {
      token,
    });

    return this;
  }

  one() {
    return this._query.getOne();
  }

  all() {
    return this._query.getMany();
  }
}
