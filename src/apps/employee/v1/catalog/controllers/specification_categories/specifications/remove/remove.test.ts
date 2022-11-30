import {
  closeDbConnection,
  createAccessToken,
  createEmployeeWithCompany,
  createServer,
} from "../../../../../../../../tests/helpers";
import { Express } from "express-serve-static-core";
import { Company, Employee } from "../../../../../../../../models/core";
import { Factories } from "../../../../../../../../database/factories";
import {
  Specification,
  SpecificationCategory,
} from "../../../../../../../../models/catalog";
import request from "supertest";

let app: Express;

describe("employee#catalog#specification_categories#controllers#GET#specification#remove", () => {
  const getUrl = ({
    companyId,
    specificationCategoryId,
    specificationId,
  }: {
    specificationCategoryId: number;
    specificationId: number;
    companyId: number;
  }) =>
    `/employee/v1/catalog/specification_categories/${specificationCategoryId}/specifications/${specificationId}?company_id=${companyId}`;

  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the employee is authenticated", () => {
    let company: Company;
    let employee: Employee;
    let accessToken: string;

    beforeAll(async () => {
      company = await Factories.Company();
      employee = await createEmployeeWithCompany({ company });
      accessToken = await createAccessToken({ employee });
    });

    describe("the specification category belongs to the user company", () => {
      let specificationCategory: SpecificationCategory;

      beforeAll(async () => {
        specificationCategory = await Factories.SpecificationCategory({
          company,
        });
      });
      describe("the specification belongs to the specification category", () => {
        let specification: Specification;

        beforeEach(async () => {
          specification = await Factories.Specification({
            category: specificationCategory,
          });
        });
        it("should remove the specification", async () => {
          const response = await request(app)
            .delete(
              getUrl({
                companyId: company.id,
                specificationCategoryId: specificationCategory.id,
                specificationId: specification.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

          const specificationInDb = await Specification.findOne({
            where: { id: specification.id },
          });
          expect(specificationInDb).toBe(null);
        });
        it("should return a 201 status code", async () => {
          const response = await request(app)
            .delete(
              getUrl({
                companyId: company.id,
                specificationCategoryId: specificationCategory.id,
                specificationId: specification.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

          expect(response.status).toBe(201);
        });
        it("should return the specification", async () => {
          const response = await request(app)
            .delete(
              getUrl({
                companyId: company.id,
                specificationCategoryId: specificationCategory.id,
                specificationId: specification.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

          expect(response.body.id).toBe(specification.id);
        });
      });
    });
    describe("the specification category don't belongs to the user company", () => {
      let specificationCategory: SpecificationCategory;

      beforeAll(async () => {
        specificationCategory = await Factories.SpecificationCategory();
      });
      describe("the specification belongs to the specification category", () => {
        let specification: Specification;
        beforeAll(async () => {
          specification = await Factories.Specification({
            category: specificationCategory,
          });
        });
        it("should return a 404 status code", async () => {
          const response = await request(app)
            .delete(
              getUrl({
                companyId: company.id,
                specificationCategoryId: specificationCategory.id,
                specificationId: specification.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

          expect(response.status).toBe(404);
        });
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
