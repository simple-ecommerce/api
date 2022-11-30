import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { Express } from "express-serve-static-core";
import request from "supertest";
import { createAccessToken } from "../../../../../../../tests/helpers/create_access_token/createAccessToken";
import { Factories } from "../../../../../../../database/factories";
import { Company, Employee } from "../../../../../../../models/core";
import { createEmployeeWithCompany } from "../../../../../../../tests/helpers";

let app: Express;
const getUrl = ({
  itemId,
  companyId,
}: {
  itemId: number | string;
  companyId: number;
}) => `/employee/v1/catalog/items/${itemId}?company_id=${companyId}`;

describe("DELETE#remove", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    describe("the item belongs to the user company", () => {
      let accessToken: string;
      let employee: Employee;
      let company: Company;
      beforeAll(async () => {
        company = await Factories.Company();
        employee = await createEmployeeWithCompany({ company });
        accessToken = await createAccessToken({ employee });
      });
      it("removes the item", async () => {
        const item = await Factories.Item({ company });
        const response = await request(app)
          .delete(getUrl({ itemId: item.id, companyId: company.id }))
          .set("Authorization", `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
      });
      it("returns the removed item", async () => {
        const item = await Factories.Item({ company });
        const response = await request(app)
          .delete(getUrl({ itemId: item.id, companyId: company.id }))
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.body.id).toEqual(item.id);
        expect(response.body.name).toEqual(item.name);
        expect(response.body.long_description).toEqual(item.longDescription);
        expect(response.body.short_description).toEqual(item.shortDescription);
        expect(response.body.price).toEqual(item.price);
      });
    });
    describe("the item does not belong to the user company", () => {
      it("should not remove the item", async () => {
        const item = await Factories.Item();
        const company = await Factories.Company();
        const employee = await createEmployeeWithCompany({ company });
        const accessToken = await createAccessToken({ employee });

        const response = await request(app)
          .delete(getUrl({ itemId: item.id, companyId: item.companyId }))
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(403);
      });
    });
    describe("the payload is invalid", () => {
      it("returns a 400 status", async () => {
        const company = await Factories.Company();
        const employee = await createEmployeeWithCompany({ company });
        const accessToken = await createAccessToken({ employee });

        const response = await request(app)
          .get(getUrl({ itemId: "invalid", companyId: company.id }))
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(400);
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
