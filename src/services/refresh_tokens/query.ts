import { SelectQueryBuilder } from "typeorm";
import { Token } from "../../aliases";
import { RefreshToken } from "../../models/authentication";

export class Query {
  private _query: SelectQueryBuilder<RefreshToken>;

  constructor(query?: SelectQueryBuilder<RefreshToken>) {
    this._query = query ?? RefreshToken.createQueryBuilder("refreshToken");
  }

  byToken(token: Token) {
    this._query = this._query.andWhere("refreshToken.token = :token", {
      token,
    });

    return this;
  }

  one() {
    return this._query.getOneOrFail();
  }

  all() {
    return this._query.getMany();
  }
}
