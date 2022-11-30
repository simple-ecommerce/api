import request from "supertest";
import { Express } from "express-serve-static-core";
import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { Factories } from "../../../../../../../database/factories";
import { closeDbConnection } from "../../../../../../../tests/helpers";

let app: Express;

describe("POST#login", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("when the user have correct credentials", () => {
    it("returns the tokens", async () => {
      const employee = await Factories.Employee();
      const response = await request(app)
        .post("/employee/v1/authorization/login")
        .send({
          email: employee.email,
          password: employee.password,
        });

      expect(response.status).toBe(200);
      expect(response.body.access_token).toBeDefined();
      expect(response.body.refresh_token).toBeDefined();
    });
  });

  describe("when the user have incorrect credentials", () => {
    it("returns a 401 status", async () => {
      const employee = await Factories.Employee();
      const response = await request(app)
        .post("/employee/v1/authorization/login")
        .send({
          email: employee.email,
          password: "wrong",
        });

      expect(response.status).toBe(401);
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
