import { Factories } from "../../../../../../../database/factories";
import request from "supertest";
import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { Express } from "express-serve-static-core";
import * as Services from "../../../../../../../services";
import { UserType } from "../../../../../../../utils/types/enums/UserType";

let app: Express;

const getUrl = (id: number) =>
  `/employee/v1/catalog/specification_categories/${id}`;

describe("catalog#specification_categories#controllers#GET#show", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });
  describe("The specification category belongs to the company", () => {
    it("should return the specification category", async () => {
      const company = await Factories.Company();
      const specificationCategory = await Factories.SpecificationCategory({
        company,
      });
      const employee = await Factories.Employee({ company });
      const refreshToken = await Factories.RefreshToken({ employee });
      const accessToken = await new Services.AccessTokens.Coder().encode({
        companyId: employee.companyId,
        refreshTokenId: refreshToken.id,
        userId: employee.id,
        userType: UserType.EMPLOYEE,
      });

      const response = await request(app)
        .get(getUrl(specificationCategory.id))
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
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
  describe("The specificationCategory does not belong to the company", () => {
    it("should return 404", async () => {
      const company = await Factories.Company();
      const employee = await Factories.Employee({ company });
      const refreshToken = await Factories.RefreshToken({ employee });
      const accessToken = await new Services.AccessTokens.Coder().encode({
        companyId: employee.companyId,
        refreshTokenId: refreshToken.id,
        userId: employee.id,
        userType: UserType.EMPLOYEE,
      });
      const specificationCategory = await Factories.SpecificationCategory();

      const response = await request(app)
        .get(getUrl(specificationCategory.id))
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(404);
    });
  });
});
