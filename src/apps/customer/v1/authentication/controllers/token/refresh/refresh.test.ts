import request from "supertest";
import { Express } from "express-serve-static-core";
import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { customerFactory } from "../../../../../../../database/factories/customer_factory";
import { refreshTokenFactory } from "../../../../../../../database/factories/refresh_token_factory";
import { Coder } from "../../../../../../../services/access_tokens/coder/coder";
import { UserType } from "../../../../../../../utils/types/enums/UserType";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";

let app: Express;

describe("POST#refresh", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy

    process.env.ACCESS_TOKEN_SECRET = "secret";
    process.env.ACCESS_TOKEN_EXPIRATION = "30s";
  });

  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("have a valid refresh token", () => {
    it("returns a valid access token", async () => {
      const customer = await customerFactory();
      const refreshToken = await refreshTokenFactory({ customer });

      const response = await request(app)
        .post("/customer/v1/authorization/refresh")
        .send({
          refresh_token: refreshToken.token,
        });
      expect(response.status).toBe(201);
      expect(response.body.access_token).toBeDefined();
      const { refreshTokenId, userId, userType } = await new Coder(
        response.body.access_token
      ).decode();

      expect(refreshTokenId).toBe(refreshToken.id);
      expect(userId).toBe(customer.id);
      expect(userType).toBe(UserType.CUSTOMER);
    });
  });
  describe("have a invalid refresh token", () => {
    it("returns a 401 error", async () => {
      const customer = await customerFactory();
      await refreshTokenFactory({ customer });

      const response = await request(app)
        .post("/customer/v1/authorization/refresh")
        .send({
          refresh_token: "wrong token",
        });
      expect(response.status).toBe(401);
    });
  });

  afterAll(async () => {
    await closeDbConnection();
    process.env = OLD_ENV; // Restore old environment
  });
});
