import { Express } from "express-serve-static-core";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";

let app: Express;

describe("GET#list", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    describe("the items belongs to the user company", () => {
      it("returns the items", async () => {});
    });
    describe("the items does not belong to the user company", () => {
      it("should not return the items", async () => {});
    });
    describe("the payload is invalid", () => {
      it("returns a 400 status", async () => {});
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
