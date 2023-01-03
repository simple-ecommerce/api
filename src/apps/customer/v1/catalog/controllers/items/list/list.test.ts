import { Express } from "express-serve-static-core";
import {
  closeDbConnection,
  createServer,
} from "../../../../../../../tests/helpers";
import request from "supertest";
import { Company } from "../../../../../../../models/core";
import { Item } from "../../../../../../../models/catalog";
import { Factories } from "../../../../../../../database/factories";
import { Id } from "../../../../../../../utils/aliases";

let app: Express;

describe("customer#v1#catalog#items#list", () => {
  const getUrl = (companyId: number) =>
    `/customer/v1/catalog/items?company_id=${companyId}&page=1&per_page=1000`;

  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("there is a company", () => {
    let company: Company;
    beforeAll(async () => {
      company = await Factories.Company();
    });
    describe("the company have items", () => {
      let items: Item[];
      beforeAll(async () => {
        items = [
          await Factories.Item({ company }),
          await Factories.Item({ company }),
          await Factories.Item({ company }),
        ];
      });

      it('should return the "200" status code', async () => {
        const response = await request(app).get(getUrl(company.id));

        expect(response.status).toBe(200);
      });

      it("should list the company items", async () => {
        const response = await request(app).get(getUrl(company.id));

        const returnedIds: number[] = response.body.results.map(
          ({ id }: { id: Id }) => id
        );
        const expectedIds = items.map(({ id }) => id);

        expect(response.body.results.length).toBe(items.length);
        expect(expectedIds.every((id) => returnedIds.includes(id))).toBe(true);
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
