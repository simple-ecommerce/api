import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { Express } from "express-serve-static-core";
import { Factories } from "../../../../../../../database/factories";
import { createAccessToken } from "../../../../../../../tests/helpers/create_access_token/createAccessToken";
import request from "supertest";

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
          const employee = await Factories.Employee();
          const item = await Factories.Item({ company: employee.company });
          const accessToken = await createAccessToken({ employee });
          const payload = {
            name: "new name",
            shortDescription: "new short description",
            longDescription: "new long description",
            price: 100,
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
          const employee = await Factories.Employee();
          const item = await Factories.Item({ company: employee.company });
          const accessToken = await createAccessToken({ employee });
          const payload = {
            name: "new name",
            shortDescription: "new short description",
            longDescription: "new long description",
            price: 100,
          };
          const response = await request(app)
            .patch(getUrl(item.id))
            .set("Authorization", `Bearer ${accessToken}`)
            .send(payload);
          expect(response.body.id).toEqual(item.id);
          expect(response.body.name).toEqual(payload.name);
          expect(response.body.short_description).toEqual(
            payload.shortDescription
          );
          expect(response.body.long_description).toEqual(
            payload.longDescription
          );
          expect(response.body.price).toEqual(payload.price);
        });
      });
      describe("the payload is invalid", () => {
        it("returns a 400 status", async () => {
          const item = await Factories.Item();
          const employee = await Factories.Employee();
          const accessToken = await createAccessToken({ employee });
          const payload = {
            name: "new name",
            shortDescription: "new short description",
            longDescription: "new long description",
            price: "invalid price",
            invalidField: "invalid field",
          };
          const response = await request(app)
            .patch(getUrl(item.id))
            .set("Authorization", `Bearer ${accessToken}`)
            .send(payload);
          expect(response.status).toBe(400);
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
          shortDescription: "new short description",
          longDescription: "new long description",
          price: 100,
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
