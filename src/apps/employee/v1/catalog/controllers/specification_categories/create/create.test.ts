import { Express } from "express-serve-static-core";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import request from "supertest";
import * as Services from "../../../../../../../services";
import { UserType } from "../../../../../../../utils/types/enums/UserType";
import { Factories } from "../../../../../../../database/factories";
import {
  createAccessToken,
  createEmployeeWithCompany,
} from "../../../../../../../tests/helpers";

let app: Express;

describe("catalog#specification_categories#controllers#POST#create", () => {
  const URL = "/employee/v1/catalog/specification_categories";

  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    describe("the payload is valid", () => {
      it("creates the given specification", async () => {
        const company = await Factories.Company();
        const employee = await createEmployeeWithCompany({ company });
        const accessToken = await createAccessToken({ employee });

        const payload = {
          name: "specification name",
          description: "specification description",
          internal_name: "specification internal name",
          company_id: company.id,
        };

        const response = await request(app)
          .post(URL)
          .set("Authorization", `Bearer ${accessToken}`)
          .send(payload);

        // return 201 status code
        expect(response.status).toBe(201);

        const specification = await new Services.SpecificationCategories.Finder(
          response.body.id
        ).find();

        //return the specification
        expect(response.body.name).toBe(payload.name);
        expect(response.body.description).toBe(payload.description);
        expect(response.body.internal_name).toBe(payload.internal_name);
        expect(response.body.id).toBeDefined();

        // creates the specification
        expect(response.body.name).toBe(specification?.name);
      });
    });
    describe("the payload is invalid", () => {
      it("returns a 400 status", async () => {
        const company = await Factories.Company();
        const employee = await createEmployeeWithCompany({ company });
        const accessToken = await createAccessToken({ employee });

        const payload = {
          long_description: "specification long description",
          short_description: "specification short description",
          price: 1000,
          sku: "specification sku",
          company_id: company.id,
        };

        const response = await request(app)
          .post(URL)
          .set("Authorization", `Bearer ${accessToken}`)
          .send(payload);

        expect(response.status).toBe(400);
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
