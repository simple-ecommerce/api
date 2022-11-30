import { Express } from "express-serve-static-core";
import { Factories } from "../../../../../../../database/factories";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import request from "supertest";
import { createAccessToken } from "../../../../../../../tests/helpers/create_access_token/createAccessToken";
import { Company, Employee } from "../../../../../../../models/core";

let app: Express;

describe("employee#core#companies#list#GET", () => {
  const URL = "/employee/v1/core/companies?page=1&per_page=1000";

  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the employee is authenticated", () => {
    let accessToken: string;
    let employee: Employee;

    beforeEach(async () => {
      employee = await Factories.Employee();
      accessToken = await createAccessToken({ employee });
    });

    describe("the employee belongs to several companies", () => {
      let companies: Company[];

      beforeEach(async () => {
        companies = [await Factories.Company(), await Factories.Company()];
        for (const company of companies) {
          await Factories.EmployeeCompany({ company, employee });
        }
      });
      it("returns the employee companies", async () => {
        const response = await request(app)
          .get(URL)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.body.results).toHaveLength(2);
        companies.forEach((company) => {
          expect(
            response.body.results.map((company: any) => company.id)
          ).toContain(company.id);
        });
      });
      it("returns the 200 status", async () => {
        const response = await request(app)
          .get(URL)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
      });

      it("don't return the company from another employees", async () => {
        const outsideCompany = await Factories.Company();
        const response = await request(app)
          .get(URL)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(
          response.body.results.map((company: any) => company.id)
        ).not.toContain(outsideCompany.id);
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
