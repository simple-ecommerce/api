import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { Express } from "express-serve-static-core";
import request from "supertest";
import { createAccessToken } from "../../../../../../../tests/helpers/create_access_token/createAccessToken";
import { Factories } from "../../../../../../../database/factories";
import { Employee } from "../../../../../../../models/core";

let app: Express;
const getUrl = (id: number | string) => `/employee/v1/catalog/items/${id}`;

describe("DELETE#remove", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    describe("the item belongs to the user company", () => {
      let accessToken: string;
      let employee: Employee;
      beforeAll(async () => {
        employee = await Factories.Employee();
        accessToken = await createAccessToken({ employee });
      });
      it("removes the item", async () => {
        const item = await Factories.Item({ company: employee.company });
        const response = await request(app)
          .delete(getUrl(item.id))
          .set("Authorization", `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
      });
      it("returns the removed item", async () => {
        const item = await Factories.Item({ company: employee.company });
        const response = await request(app)
          .delete(getUrl(item.id))
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
        const employee = await Factories.Employee();
        const accessToken = await createAccessToken({ employee });

        console.log({ paylodId: item.id });
        const response = await request(app)
          .delete(getUrl(item.id))
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(403);
      });
    });
    describe("the payload is invalid", () => {
      it("returns a 400 status", async () => {
        const employee = await Factories.Employee();
        const accessToken = await createAccessToken({ employee });
        const response = await request(app)
          .get(getUrl("invalid"))
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(400);
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
