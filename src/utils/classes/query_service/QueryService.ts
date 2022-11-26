import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

export class QueryService<T extends ObjectLiteral> {
  protected _page: number;
  protected _perPage: number;
  query: SelectQueryBuilder<T>;

  constructor() {}

  perPage(per: number) {
    this._perPage = per;

    return this;
  }

  page(page: number) {
    this._page = page;

    return this;
  }

  async paginated() {
    const skip = (() => {
      if (this._page === 1) return 0;
      return (this._page - 1) * this._perPage;
    })();
    const take = this._perPage;

    const results = await this.query.skip(skip).take(take).getMany();
    const pagination = await this.buildPagination();

    return { pagination, results };
  }

  orderBy(
    sort: string,
    order?: "ASC" | "DESC",
    nulls?: "NULLS FIRST" | "NULLS LAST"
  ) {
    this.query = this.query.orderBy(sort, order, nulls);

    return this;
  }

  one() {
    return this.query.getOne();
  }

  all() {
    return this.query.getMany();
  }

  private async buildPagination() {
    const totalCount = await this.query.getCount();
    const totalPages = Math.ceil(totalCount / this._perPage);
    const nextPage = (() => {
      if (this._page === totalPages) {
        return null;
      }
      return this._page + 1;
    })();
    const prevPage = this._page === 1 ? null : this._page - 1;

    return {
      currentPage: this._page,
      perPage: this._perPage,
      nextPage,
      prevPage,
      totalPages,
      totalCount,
    };
  }
}
