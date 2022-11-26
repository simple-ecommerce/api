import { createServer } from "../../../../../../../tests/helpers/create_server/createServer";
import { closeDbConnection } from "../../../../../../../tests/helpers/close_db_connection/closeDbConnection";
import { Express } from "express-serve-static-core";
import { Factories } from "../../../../../../../database/factories";
import { createAccessToken } from "../../../../../../../tests/helpers/create_access_token/createAccessToken";
import request from "supertest";

let app: Express;

const getUrl = (id: number | string) =>
  `/employee/v1/catalog/specifications/${id}`;

describe("PUT#update", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    describe("the specification belongs to the user company", () => {
      describe("the payload is valid", () => {
        it("updates the given specification", async () => {
          const employee = await Factories.Employee();
          const specification = await Factories.SpecificationCategory({
            company: employee.company,
          });
          const accessToken = await createAccessToken({ employee });
          const payload = {
            name: "new name",
            description: "new description",
            internal_name: "new internal name",
            price: 100,
          };
          const response = await request(app)
            .patch(getUrl(specification.id))
            .set("Authorization", `Bearer ${accessToken}`)
            .send(payload);
          expect(response.status).toBe(200);

          await specification.reload();

          expect(specification.name).toBe(payload.name);
          expect(specification.description).toBe(payload.description);
          expect(specification.internalName).toBe(payload.internal_name);
        });
        it("returns the updated specification", async () => {
          const employee = await Factories.Employee();
          const specification = await Factories.SpecificationCategory({
            company: employee.company,
          });
          const accessToken = await createAccessToken({ employee });
          const payload = {
            name: "new name",
            description: "new description",
            internal_name: "new internal name",
          };
          const response = await request(app)
            .patch(getUrl(specification.id))
            .set("Authorization", `Bearer ${accessToken}`)
            .send(payload);
          expect(response.body.id).toEqual(specification.id);
          expect(response.body.name).toEqual(payload.name);
          expect(response.body.description).toEqual(payload.description);
          expect(response.body.internal_name).toEqual(payload.internal_name);
        });
      });
    });
    describe("the specification does not belong to the user company", () => {
      it("should not update the specification", async () => {
        const specification = await Factories.SpecificationCategory();
        const employee = await Factories.Employee();
        const accessToken = await createAccessToken({ employee });
        const payload = {
          name: "new name",
          shortDescription: "new short description",
          longDescription: "new long description",
          price: 100,
        };
        const response = await request(app)
          .patch(getUrl(specification.id))
          .set("Authorization", `Bearer ${accessToken}`)
          .send(payload);

        expect(response.status).toBe(403);
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
