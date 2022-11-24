import { dataSource } from "../../../app-data-source";
import { Factories } from "../../../database/factories";
import { Item } from "../../../models/catalog";
import { ItemsQuery } from "./Query";

describe("services#items#query#Query", () => {
  beforeAll(async () => {
    await dataSource.initialize();
  });
  describe("#paginated", () => {
    it("returns the paginated results", async () => {
      const company = await Factories.Company();
      const items = (
        await Promise.all(
          new Array(20).fill(null).map(async () => Factories.Item({ company }))
        )
      ).sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
      const tests: {
        pagination: {
          currentPage: number;
          nextPage: number | null;
          perPage: number;
          prevPage: number | null;
          totalPages: number;
          totalCount: number;
        };
        results: Item[];
      }[] = [
        {
          pagination: {
            currentPage: 1,
            nextPage: 2,
            perPage: 10,
            prevPage: null,
            totalPages: 2,
            totalCount: 20,
          },
          results: items.slice(0, 10),
        },
        {
          pagination: {
            currentPage: 2,
            nextPage: 3,
            perPage: 5,
            prevPage: 1,
            totalPages: 4,
            totalCount: 20,
          },
          results: items.slice(5, 10),
        },
        {
          pagination: {
            currentPage: 6,
            nextPage: 7,
            perPage: 2,
            prevPage: 5,
            totalPages: 10,
            totalCount: 20,
          },
          results: items.slice(10, 12),
        },
      ];
      for (const {
        pagination: {
          currentPage,
          nextPage,
          perPage,
          prevPage,
          totalPages,
          totalCount,
        },
        results: expectedResults,
      } of tests) {
        const { pagination, results } = await new ItemsQuery()
          .page(currentPage)
          .perPage(perPage)
          .orderBy("item.id", "ASC")
          .paginated();

        expect(pagination.currentPage).toEqual(currentPage);
        expect(pagination.nextPage).toEqual(nextPage);
        expect(pagination.perPage).toEqual(perPage);
        expect(pagination.prevPage).toEqual(prevPage);
        expect(pagination.totalPages).toEqual(totalPages);
        expect(pagination.totalCount).toEqual(totalCount);
        results.forEach((result, index) => {
          expect(result.id).toEqual(expectedResults[index].id);
        });
      }
    });
  });
});
