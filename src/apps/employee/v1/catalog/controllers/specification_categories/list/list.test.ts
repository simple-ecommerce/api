import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { Express } from "express-serve-static-core";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { Company } from "../../../../../../../models/core";
import { Factories } from "../../../../../../../database/factories";
import { createAccessToken } from "../../../../../../../tests/helpers/create_access_token/createAccessToken";
import { SpecificationCategory } from "../../../../../../../models/catalog";
import request from "supertest";

let app: Express;

describe("catalog#specification_categories#list_controller", () => {
  const URL = "/employee/v1/catalog/specification_categories";

  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    let company: Company;
    let accessToken: string;

    beforeEach(async () => {
      company = await Factories.Company();

      const employee = await Factories.Employee({ company });
      accessToken = await createAccessToken({ employee });
    });

    describe("companies have specification categories", () => {
      let specificationCategories: SpecificationCategory[];
      let anotherCompanySpecificationCategories: SpecificationCategory[];

      beforeEach(async () => {
        specificationCategories = [
          await Factories.SpecificationCategory({ company }),
          await Factories.SpecificationCategory({ company }),
          await Factories.SpecificationCategory({ company }),
        ];
        anotherCompanySpecificationCategories = [
          await Factories.SpecificationCategory(),
          await Factories.SpecificationCategory(),
        ];
      });
      it("returns the user company specification categories", async () => {
        const response = await request(app)
          .get(`${URL}?page=1&per_page=1000`)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(200);
        expect(response.body.results).toHaveLength(3);
        specificationCategories.forEach((specificationCategory) => {
          expect(
            response.body.results.map(
              (specificationCategory: any) => specificationCategory.id
            )
          ).toContain(specificationCategory.id);
        });
      });
      it("don't return the specification categories from another companies", async () => {
        const response = await request(app)
          .get(`${URL}?page=1&per_page=1000`)
          .set("Authorization", `Bearer ${accessToken}`);

        anotherCompanySpecificationCategories.forEach(
          (specificationCategory) => {
            expect(
              response.body.results.map(
                (specificationCategory: any) => specificationCategory.id
              )
            ).not.toContain(specificationCategory.id);
          }
        );
      });
      it("returns the specification category categories", async () => {
        await Factories.Specification({ category: specificationCategories[0] });
        await Factories.Specification({ category: specificationCategories[1] });
        await Factories.Specification({ category: specificationCategories[2] });

        const response = await request(app)
          .get(`${URL}?page=1&per_page=1000`)
          .set("Authorization", `Bearer ${accessToken}`);

        response.body.results.forEach((specificationCategory: any) => {
          expect(specificationCategory.specifications).toHaveLength(1);
          expect(specificationCategory.specifications[0].name).toBeDefined();
          expect(
            specificationCategory.specifications[0].description
          ).toBeDefined();
        });
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
