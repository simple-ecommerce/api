import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { Express } from "express-serve-static-core";
import { Factories } from "../../../../../../../database/factories";
import { createAccessToken } from "../../../../../../../tests/helpers/create_access_token/createAccessToken";
import request from "supertest";
import { createEmployeeWithCompany } from "../../../../../../../tests/helpers";

let app: Express;

const getUrl = (id: number | string) => `/employee/v1/catalog/items/${id}`;

describe("PUT#update", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    describe("the item belongs to the user company", () => {
      describe("the payload is valid", () => {
        it("updates the given item", async () => {
          const company = await Factories.Company();
          const employee = await createEmployeeWithCompany({ company });
          const item = await Factories.Item({ company });
          const accessToken = await createAccessToken({ employee });

          const payload = {
            name: "new name",
            shortDescription: "new short description",
            longDescription: "new long description",
            price: 100,
            company_id: company.id,
          };
          const response = await request(app)
            .patch(getUrl(item.id))
            .set("Authorization", `Bearer ${accessToken}`)
            .send(payload);

          expect(response.status).toBe(200);

          await item.reload();

          expect(item.name).toBe(payload.name);
          expect(item.shortDescription).toBe(payload.shortDescription);
          expect(item.longDescription).toBe(payload.longDescription);
          expect(item.price).toBe(payload.price);
        });
        it("returns the updated item", async () => {
          const company = await Factories.Company();
          const employee = await createEmployeeWithCompany({ company });
          const item = await Factories.Item({ company });
          const accessToken = await createAccessToken({ employee });
          const payload = {
            name: "new name",
            short_description: "new short description",
            long_description: "new long description",
            price: 100,
            company_id: company.id,
          };
          const response = await request(app)
            .patch(getUrl(item.id))
            .set("Authorization", `Bearer ${accessToken}`)
            .send(payload);
          expect(response.body.id).toEqual(item.id);
          expect(response.body.name).toEqual(payload.name);
          expect(response.body.short_description).toEqual(
            payload.short_description
          );
          expect(response.body.long_description).toEqual(
            payload.long_description
          );
          expect(response.body.price).toEqual(payload.price);
        });
      });
    });
    describe("the item does not belong to the user company", () => {
      it("should not update the item", async () => {
        const item = await Factories.Item();
        const employee = await Factories.Employee();
        const accessToken = await createAccessToken({ employee });
        const payload = {
          name: "new name",
          short_description: "new short description",
          long_description: "new long description",
          price: 100,
          company_id: item.companyId,
        };
        const response = await request(app)
          .patch(getUrl(item.id))
          .set("Authorization", `Bearer ${accessToken}`)
          .send(payload);

        expect(response.status).toBe(403);
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
