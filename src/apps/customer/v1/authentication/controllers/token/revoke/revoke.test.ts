import request from "supertest";
import { Express } from "express-serve-static-core";
import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";

import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { customerFactory } from "../../../../../../../database/factories/customer_factory";
import { refreshTokenFactory } from "../../../../../../../database/factories/refresh_token_factory";
import { Coder } from "../../../../../../../services/access_tokens/coder/coder";
import { UserType } from "../../../../../../../types/enums/UserType";
import { RefreshTokens } from "../../../../../../../services";

let app: Express;

describe("POST#revoke", () => {
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

  it("it revokes the refresh token", async () => {
    const customer = await customerFactory();
    const refreshToken = await refreshTokenFactory({ customer });
    const accessToken = await new Coder().encode({
      companyId: customer.company.id,
      refreshTokenId: refreshToken.id,
      userId: customer.id,
      userType: UserType.CUSTOMER,
    });

    const response = await request(app)
      .post("/customer/v1/authorization/revoke")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        access_token: accessToken,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Token revoked");
    const refreshTokenFinder = new RefreshTokens.Finder(refreshToken.id);
    expect(async () => {
      await refreshTokenFinder.find();
    }).rejects.toThrow();
  });

  afterAll(async () => {
    await closeDbConnection();
    process.env = OLD_ENV; // Restore old environment
  });
});
