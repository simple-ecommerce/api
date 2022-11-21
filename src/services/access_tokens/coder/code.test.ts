import { Coder } from "./coder";
import jwt from "jsonwebtoken";
import { wait } from "../../../helpers/promise/promiseHelpers";
import { UserType } from "../../../types/enums/UserType";

describe("services#access_tokens#coder", () => {
  const OLD_ENV = process.env;

  const payload = {
    companyId: 1,
    refreshTokenId: 1,
    userId: 1,
    userType: UserType.CUSTOMER,
  };

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy

    process.env.ACCESS_TOKEN_SECRET = "secret";
    process.env.ACCESS_TOKEN_EXPIRATION = "30s";
  });

  describe("#encode", () => {
    it("encodes correctly", async () => {
      const coder = new Coder();
      const token = await coder.encode(payload);

      expect(token).toBeDefined();
    });
  });

  describe("#decode", () => {
    describe("the token is valid", () => {
      it("decodes correctly", async () => {
        const coder = new Coder();
        await coder.encode(payload);
        const decoded = await coder.decode();
        expect(decoded.companyId).toBe(payload.companyId);
        expect(decoded.refreshTokenId).toBe(payload.refreshTokenId);
        expect(decoded.userId).toBe(payload.userId);
      });
    });

    describe("the token is expired", () => {
      it("throws an error", async () => {
        const coder = new Coder();
        coder.accessToken = jwt.sign(
          payload,
          process.env.ACCESS_TOKEN_SECRET ?? "",
          {
            expiresIn: "1",
          }
        );
        await wait(10);

        expect(async () => await coder.decode()).rejects.toThrow(
          "Invalid token"
        );
      });
    });
    describe("the token have a wrong payload", () => {
      it("throws an error", async () => {
        const coder = new Coder(
          jwt.sign(
            {
              userId: 1,
              refreshTokenId: 1,
              companyId: null,
              userType: UserType.CUSTOMER,
            },
            process.env.ACCESS_TOKEN_SECRET ?? "",
            {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
            }
          )
        );

        expect(async () => await coder.decode()).rejects.toThrow(
          "Invalid token"
        );
      });
    });
    describe("the token is invalid", () => {
      it("throws an error", () => {
        const coder = new Coder(
          jwt.sign(
            { userId: 1, refreshTokenId: 1, companyId: 1 },
            "wrong secret",
            {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
            }
          )
        );
        expect(async () => await coder.decode()).rejects.toThrow(
          "Invalid token"
        );
      });
    });
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });
});
