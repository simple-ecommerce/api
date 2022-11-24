import { Factories } from "../../../../../../../database/factories";
import request from "supertest";
import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { Express } from "express-serve-static-core";
import * as Services from "../../../../../../../services";
import { UserType } from "../../../../../../../types/enums/UserType";

let app: Express;

const getUrl = (id: number) => `/employee/v1/catalog/items/${id}`;

describe("GET#show", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });
  describe("The item belongs to the company", () => {
    it("should return the item", async () => {
      const company = await Factories.Company();
      const item = await Factories.Item({ company });
      const employee = await Factories.Employee({ company });
      const refreshToken = await Factories.RefreshToken({ employee });
      const accessToken = await new Services.AccessTokens.Coder().encode({
        companyId: employee.companyId,
        refreshTokenId: refreshToken.id,
        userId: employee.id,
        userType: UserType.EMPLOYEE,
      });

      const response = await request(app)
        .get(getUrl(item.id))
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(item.id);
      expect(response.body.name).toEqual(item.name);
      expect(response.body.long_description).toEqual(item.longDescription);
      expect(response.body.short_description).toEqual(item.shortDescription);
      expect(response.body.price).toEqual(item.price);
      expect(response.body.sku).toEqual(item.sku);
      expect(response.body.ean).toEqual(item.ean);
      expect(response.body.brand).toEqual(item.brand);
    });
  });
  describe("The item does not belong to the company", () => {
    it("should return 404", async () => {
      const company = await Factories.Company();
      const employee = await Factories.Employee({ company });
      const refreshToken = await Factories.RefreshToken({ employee });
      const accessToken = await new Services.AccessTokens.Coder().encode({
        companyId: employee.companyId,
        refreshTokenId: refreshToken.id,
        userId: employee.id,
        userType: UserType.EMPLOYEE,
      });
      const item = await Factories.Item();

      const response = await request(app)
        .get(`/v1/items/${item.id}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(404);
    });
  });
});
