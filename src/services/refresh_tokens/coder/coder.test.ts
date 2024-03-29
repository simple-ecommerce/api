import jwt from "jsonwebtoken";
import { wait } from "../../../utils/helpers/promise/promiseHelpers";
import { Application } from "../../../utils/types/enums/Application";
import { RefreshTokensCoder } from "./coder";

describe("services#refresh_tokens#coder", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };

    process.env.REFRESH_TOKEN_SECRET = "secret";
    process.env.REFRESH_TOKEN_EXPIRATION = "30s";
  });
  describe("#validate", () => {
    describe("the token is valid", () => {
      it("returns true", async () => {
        const coder = new RefreshTokensCoder();
        coder.encode({ application: Application.CUSTOMER_WEB_APP });

        expect(await coder.validate()).toBe(true);
      });
    });
    describe("the token is invalid", () => {
      it("throws an error", async () => {
        const refreshToken = jwt.sign(
          { application: Application.CUSTOMER_WEB_APP },
          "wrong_secret",
          {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
          }
        );

        const coder = new RefreshTokensCoder(refreshToken);

        expect(await coder.validate()).toBe(false);
      });
    });
    describe("the token is expired", () => {
      it("throws an error", async () => {
        const token = jwt.sign(
          { application: Application.CUSTOMER_WEB_APP },
          process.env.REFRESH_TOKEN_SECRET ?? "",
          {
            expiresIn: "1",
          }
        );

        const coder = new RefreshTokensCoder(token);
        await wait(10);

        expect(await coder.validate()).toBe(false);
      });
    });
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });
});
