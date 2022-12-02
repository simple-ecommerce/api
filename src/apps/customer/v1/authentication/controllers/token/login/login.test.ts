import request from "supertest";
import { Express } from "express-serve-static-core";
import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { companyFactory } from "../../../../../../../database/factories/company_factory";
import { customerFactory } from "../../../../../../../database/factories/customer_factory";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";

let app: Express;

describe("POST#login", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("when the user have correct credentials", () => {
    it("returns the tokens", async () => {
      const company = await companyFactory({ name: "Company" });
      const customer = await customerFactory({
        company,
        email: "user@company.com",
        password: "123456",
      });

      const response = await request(app)
        .post("/customer/v1/authorization/login")
        .send({
          email: customer.email,
          password: "123456",
          companyId: company.id,
        });

      expect(response.status).toBe(200);
      expect(response.body.access_token).toBeDefined();
      expect(response.body.refresh_token).toBeDefined();
    });
  });

  describe("when the user have incorrect credentials", () => {
    it("returns a 401 status", async () => {
      const company = await companyFactory({ name: "Company" });
      const customer = await customerFactory({
        company,
        email: "user@company.com",
        password: "123456",
      });
      const response = await request(app)
        .post("/customer/v1/authorization/login")
        .send({
          email: customer.email,
          password: "wrong",
          companyId: company.id,
        });

      expect(response.status).toBe(401);
    });
  });

  describe("when the user have correct credentials from another company", () => {
    it("returns a 401 status", async () => {
      const companyA = await companyFactory();
      const customer = await customerFactory({
        company: companyA,
        email: "user@company.com",
        password: "123456",
      });

      const companyB = await companyFactory();

      const response = await request(app)
        .post("/customer/v1/authorization/login")
        .send({
          email: customer.email,
          password: "123456",
          companyId: companyB.id,
        });

      expect(response.status).toBe(401);
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
