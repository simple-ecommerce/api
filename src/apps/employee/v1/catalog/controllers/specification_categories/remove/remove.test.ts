import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { Express } from "express-serve-static-core";
import request from "supertest";
import { createAccessToken } from "../../../../../../../tests/helpers/create_access_token/createAccessToken";
import { Factories } from "../../../../../../../database/factories";
import { Employee } from "../../../../../../../models/core";

let app: Express;
const getUrl = (id: number | string) =>
  `/employee/v1/catalog/specification_categories/${id}`;

describe("catalog#specifications#controllers#DELETE#remove", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    describe("the specification category belongs to the user company", () => {
      let accessToken: string;
      let employee: Employee;
      beforeAll(async () => {
        employee = await Factories.Employee();
        accessToken = await createAccessToken({ employee });
      });
      it("removes the specification category", async () => {
        const specification = await Factories.SpecificationCategory({
          company: employee.company,
        });
        const response = await request(app)
          .delete(getUrl(specification.id))
          .set("Authorization", `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
      });
      it("returns the removed specification category", async () => {
        const specification = await Factories.SpecificationCategory({
          company: employee.company,
        });
        const response = await request(app)
          .delete(getUrl(specification.id))
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.body.id).toEqual(specification.id);
        expect(response.body.name).toEqual(specification.name);
        expect(response.body.description).toEqual(specification.description);
        expect(response.body.internal_name).toEqual(specification.internalName);
      });
    });
    // describe("the specification does not belong to the user company", () => {
    //   it("should not remove the specification", async () => {
    //     const specification = await Factories.SpecificationCategory();
    //     const employee = await Factories.Employee();
    //     const accessToken = await createAccessToken({ employee });
    //     const response = await request(app)
    //       .delete(getUrl(specification.id))
    //       .set("Authorization", `Bearer ${accessToken}`);

    //     expect(response.status).toBe(403);
    //   });
    // });
    // describe("the payload is invalid", () => {
    //   it("returns a 400 status", async () => {
    //     const employee = await Factories.Employee();
    //     const accessToken = await createAccessToken({ employee });
    //     const response = await request(app)
    //       .get(getUrl("invalid"))
    //       .set("Authorization", `Bearer ${accessToken}`);

    //     expect(response.status).toBe(400);
    //   });
    // });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
