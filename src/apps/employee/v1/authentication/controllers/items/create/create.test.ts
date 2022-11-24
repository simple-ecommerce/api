import { Express } from "express-serve-static-core";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import request from "supertest";
import * as Services from "../../../../../../../services";
import { UserType } from "../../../../../../../types/enums/UserType";
import { Factories } from "../../../../../../../database/factories";

let app: Express;
const URL = "/employee/v1/catalog/items";

describe("POST#create", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    describe("the payload is valid", () => {
      it("creates the given item", async () => {
        const employee = await Factories.Employee();
        const refreshToken = await Factories.RefreshToken({ employee });
        const accessToken = await new Services.AccessTokens.Coder().encode({
          companyId: employee.companyId,
          refreshTokenId: refreshToken.id,
          userId: employee.id,
          userType: UserType.EMPLOYEE,
        });

        const payload = {
          name: "item name",
          long_description: "item long description",
          short_description: "item short description",
          price: 100,
          sku: "item sku",
        };

        const response = await request(app)
          .post(URL)
          .set("Authorization", `Bearer ${accessToken}`)
          .send(payload);

        // return 201 status code
        expect(response.status).toBe(201);

        const item = await new Services.Items.Finder(response.body.id).find();

        //return the item
        expect(response.body.name).toBe(payload.name);
        expect(response.body.long_description).toBe(payload.long_description);
        expect(response.body.short_description).toBe(payload.short_description);
        expect(response.body.price).toBe(payload.price);
        expect(response.body.sku).toBe(payload.sku);
        expect(response.body.id).toBeDefined();

        // creates the item
        expect(response.body.name).toBe(item.name);
        expect(response.body.long_description).toBe(item.longDescription);
        expect(response.body.short_description).toBe(item.shortDescription);
        expect(response.body.price).toBe(item.price);
        expect(response.body.sku).toBe(item.sku);
      });
    });
    describe("the payload is invalid", () => {
      it("returns a 400 status", async () => {
        const employee = await Factories.Employee();
        const refreshToken = await Factories.RefreshToken({ employee });
        const accessToken = await new Services.AccessTokens.Coder().encode({
          companyId: employee.companyId,
          refreshTokenId: refreshToken.id,
          userId: employee.id,
          userType: UserType.EMPLOYEE,
        });

        const payload = {
          long_description: "item long description",
          short_description: "item short description",
          price: 1000,
          sku: "item sku",
        };

        const response = await request(app)
          .post(URL)
          .set("Authorization", `Bearer ${accessToken}`)
          .send(payload);

        expect(response.status).toBe(400);
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
