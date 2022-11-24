import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { Express } from "express-serve-static-core";

let app: Express;

describe("DELETE#remove", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    describe("the item belongs to the user company", () => {
      it("removes the item", async () => {});
      it("returns the removed item", async () => {});
    });
    describe("the item does not belong to the user company", () => {
      it("should not remove the item", async () => {});
    });
    describe("the payload is invalid", () => {
      it("returns a 400 status", async () => {});
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
