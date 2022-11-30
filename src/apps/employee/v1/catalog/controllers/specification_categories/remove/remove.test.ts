import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { Express } from "express-serve-static-core";
import request from "supertest";
import { createAccessToken } from "../../../../../../../tests/helpers/create_access_token/createAccessToken";
import { Factories } from "../../../../../../../database/factories";
import { Company, Employee } from "../../../../../../../models/core";
import { createEmployeeWithCompany } from "../../../../../../../tests/helpers";

let app: Express;
const getUrl = ({
  companyId,
  specificationCategoryId,
}: {
  specificationCategoryId: number | string;
  companyId: number;
}) =>
  `/employee/v1/catalog/specification_categories/${specificationCategoryId}?company_id=${companyId}`;

describe("catalog#specification_categories#controllers#DELETE#remove", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    describe("the specification category belongs to the user company", () => {
      let accessToken: string;
      let employee: Employee;
      let company: Company;

      beforeAll(async () => {
        company = await Factories.Company();
        employee = await createEmployeeWithCompany({ company });
        accessToken = await createAccessToken({ employee });
      });
      it("removes the specification category", async () => {
        const specificationCategory = await Factories.SpecificationCategory({
          company,
        });
        const response = await request(app)
          .delete(
            getUrl({
              companyId: specificationCategory.id,
              specificationCategoryId: specificationCategory.companyId,
            })
          )
          .set("Authorization", `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
      });
      it("returns the removed specification category", async () => {
        const specificationCategory = await Factories.SpecificationCategory({
          company,
        });
        const response = await request(app)
          .delete(
            getUrl({
              companyId: specificationCategory.companyId,
              specificationCategoryId: specificationCategory.id,
            })
          )
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.body.id).toEqual(specificationCategory.id);
        expect(response.body.name).toEqual(specificationCategory.name);
        expect(response.body.description).toEqual(
          specificationCategory.description
        );
        expect(response.body.internal_name).toEqual(
          specificationCategory.internalName
        );
      });
    });
    describe("the specification does not belong to the user company", () => {
      it("should not remove the specification", async () => {
        const specification = await Factories.SpecificationCategory();
        const company = await Factories.Company();
        const employee = await createEmployeeWithCompany({ company });
        const accessToken = await createAccessToken({ employee });
        const response = await request(app)
          .delete(
            getUrl({
              specificationCategoryId: specification.id,
              companyId: company.id,
            })
          )
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(403);
      });
    });
    describe("the payload is invalid", () => {
      it("returns a 400 status", async () => {
        const company = await Factories.Company();
        const employee = await createEmployeeWithCompany({ company });
        const accessToken = await createAccessToken({ employee });

        const response = await request(app)
          .get(
            getUrl({
              companyId: company.id,
              specificationCategoryId: "invalid_params",
            })
          )
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(400);
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
