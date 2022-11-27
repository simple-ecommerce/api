import {
  closeDbConnection,
  createServer,
} from "../../../../../../../../tests/helpers";
import { Express } from "express-serve-static-core";

let app: Express;

describe("employee#catalog#specification_categories#controllers#GET#specification#remove", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    describe("the specification category belongs to the user company", () => {
      it("should remove the specification", async () => {});
      it("should return a 201 status code", async () => {});
      it("should return the specification", async () => {});
    });
    describe("the specification don't belongs to the user company", () => {
      it("should return a 404 status code", async () => {});
    });
    describe("the specification category don't belongs to the user company", () => {
      it("should return a 404 status code", async () => {});
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
