import request from "supertest";
import { Express } from "express-serve-static-core";
import {
  createServer,
  closeDbConnection,
  createEmployeeWithCompany,
} from "../../../../../../../../tests/helpers";
import { Token } from "../../../../../../../../utils/aliases";
import { Company, Employee } from "../../../../../../../../models/core";
import { createAccessToken } from "../../../../../../../../tests/helpers";
import {
  Specification,
  SpecificationCategory,
} from "../../../../../../../../models/catalog";
import { Factories } from "../../../../../../../../database/factories";

let app: Express;

describe("employee#catalog#specification_categories#controllers#GET#specification#create", () => {
  const getUrl = (specificationCategoryId: number) =>
    `/employee/v1/catalog/specification_categories/${specificationCategoryId}/specifications`;

  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    let company: Company;
    let employee: Employee;
    let accessToken: Token;

    beforeAll(async () => {
      company = await Factories.Company();
      employee = await createEmployeeWithCompany({ company });
      accessToken = await createAccessToken({ employee });
    });

    describe("the payload is valid", () => {
      let payload: any;
      beforeAll(() => {
        payload = {
          name: "test",
          description: "test",
          company_id: company.id,
        };
      });
      describe("the specification category belongs to the user company", () => {
        let specificationCategory: SpecificationCategory;
        beforeAll(async () => {
          specificationCategory = await Factories.SpecificationCategory({
            company,
          });
        });
        it("should create the specification", async () => {
          const response = await request(app)
            .post(getUrl(specificationCategory.id))
            .set("Authorization", `Bearer ${accessToken}`)
            .send(payload);

          const specification = await Specification.findOne({
            where: { id: response.body.id },
          });

          expect(specification).toBeTruthy();
        });
        it("should return a 200 status code", async () => {
          const response = await request(app)
            .post(getUrl(specificationCategory.id))
            .set("Authorization", `Bearer ${accessToken}`)
            .send(payload);

          expect(response.status).toBe(200);
        });
        it("should return the specification", async () => {
          const response = await request(app)
            .post(getUrl(specificationCategory.id))
            .set("Authorization", `Bearer ${accessToken}`)
            .send(payload);

          expect(response.body.name).toBe(payload.name);
          expect(response.body.description).toBe(payload.description);
        });
      });
      describe("the specification category don't belongs to the user company", () => {
        let specificationCategory: SpecificationCategory;
        beforeAll(async () => {
          specificationCategory = await Factories.SpecificationCategory();
        });
        it("should return a 404 status code", async () => {
          const response = await request(app)
            .post(getUrl(specificationCategory.id))
            .set("Authorization", `Bearer ${accessToken}`)
            .send(payload);

          expect(response.status).toBe(404);
        });
      });
    });
    describe("the payload is invalid", () => {
      let invalidPayload: any;
      beforeAll(() => {
        invalidPayload = {
          invalid: "invalid",
          company_id: company.id,
        };
      });
      it("should return a 400 status code", async () => {
        const response = await request(app)
          .post(getUrl(1))
          .set("Authorization", `Bearer ${accessToken}`)
          .send(invalidPayload);

        expect(response.status).toBe(400);
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
