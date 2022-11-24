import { Express } from "express-serve-static-core";
import { Factories } from "../../../../../../../database/factories";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import request from "supertest";
import { Item } from "../../../../../../../models/catalog";
import { createAccessToken } from "../../../../../../../tests/helpers/create_access_token/createAccessToken";
import { Company } from "../../../../../../../models/core";

let app: Express;

describe("GET#list", () => {
  const URL = "/employee/v1/catalog/items";

  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    let company: Company;
    let accessToken: string;

    beforeEach(async () => {
      company = await Factories.Company();

      const employee = await Factories.Employee({ company });
      accessToken = await createAccessToken({ employee });
    });

    describe("companies have items", () => {
      let items: Item[];
      let anotherCompanyItems: Item[];

      beforeEach(async () => {
        items = [
          await Factories.Item({ company }),
          await Factories.Item({ company }),
          await Factories.Item({ company }),
        ];
        anotherCompanyItems = [await Factories.Item(), await Factories.Item()];
      });
      it("returns the user company items", async () => {
        const response = await request(app)
          .get(`${URL}?page=1&per_page=1000`)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body.results).toHaveLength(3);
        items.forEach((item) => {
          expect(response.body.results.map((item: any) => item.id)).toContain(
            item.id
          );
        });
      });
      it("don't return the items from another companies", async () => {
        const response = await request(app)
          .get(`${URL}?page=1&per_page=1000`)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body.results).toHaveLength(3);
        anotherCompanyItems.forEach((item) => {
          expect(
            response.body.results.map((item: any) => item.id)
          ).not.toContain(item.id);
        });
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
