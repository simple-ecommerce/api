import { Express } from "express-serve-static-core";
import { Factories } from "../../../../../../../../database/factories";
import { Item } from "../../../../../../../../models/catalog";
import { Company, Employee, Image } from "../../../../../../../../models/core";
import {
  closeDbConnection,
  createAccessToken,
  createEmployeeWithCompany,
  createServer,
} from "../../../../../../../../tests/helpers";
import request from "supertest";
import { Id } from "../../../../../../../../utils/aliases";
import * as Services from "../../../../../../../../services";

describe("employee#v1#catalog#items#images#remove#DELETE", () => {
  const buildUrl = ({
    itemId,
    imageId,
    companyId,
  }: {
    itemId: Id;
    imageId: Id;
    companyId: Id;
  }) =>
    `/employee/v1/catalog/items/${itemId}/images/${imageId}?company_id=${companyId}`;

  let app: Express;

  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the user is authenticated", () => {
    let accessToken: string;
    let company: Company;
    let employee: Employee;

    beforeEach(async () => {
      company = await Factories.Company();
      employee = await createEmployeeWithCompany({ company });
      accessToken = await createAccessToken({ employee });
    });
    describe("the item belongs to the user company", () => {
      let item: Item;

      beforeEach(async () => {
        item = await Factories.Item({ company });
      });

      describe("the image belongs to the item", () => {
        let image: Image;

        beforeEach(async () => {
          image = await Factories.Image({ item });
        });

        it("should remove the image", async () => {
          await request(app)
            .delete(
              buildUrl({
                imageId: image.id,
                itemId: item.id,
                companyId: company.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`);

          const deletedImage = await new Services.Images.Finder(
            image.id
          ).find();

          expect(deletedImage).toBeNull();
        });

        it("should return 200", async () => {
          const response = await request(app)
            .delete(
              buildUrl({
                imageId: image.id,
                itemId: item.id,
                companyId: company.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`);

          expect(response.status).toBe(200);
        });
      });
      describe("the image don't belongs to the item", () => {
        let image: Image;

        beforeEach(async () => {
          image = await Factories.Image();
        });
        it('should return a 404 "not found" error', async () => {
          const response = await request(app)
            .delete(
              buildUrl({
                imageId: image.id,
                itemId: item.id,
                companyId: company.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`);

          expect(response.status).toBe(404);
        });
        it("the image shouldn't be removed", async () => {
          await request(app).delete(
            buildUrl({
              imageId: image.id,
              itemId: item.id,
              companyId: company.id,
            })
          );
          const deletedImage = await new Services.Images.Finder(
            image.id
          ).find();

          expect(deletedImage).not.toBeNull();
        });
      });
    });
    describe("the item don't belongs to the user company", () => {
      let item: Item;

      beforeEach(async () => {
        item = await Factories.Item();
      });

      describe("the image belongs to the item", () => {
        let image: Image;

        beforeEach(async () => {
          image = await Factories.Image({ item });
        });

        it('should return a 404 "not found" error', async () => {
          const response = await request(app)
            .delete(
              buildUrl({
                imageId: image.id,
                itemId: item.id,
                companyId: company.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`);

          expect(response.status).toBe(404);
        });

        it("the image shouldn't be removed", async () => {
          await request(app).delete(
            buildUrl({
              imageId: image.id,
              itemId: item.id,
              companyId: company.id,
            })
          );

          const deletedImage = await new Services.Images.Finder(
            image.id
          ).find();

          expect(deletedImage).not.toBeNull();
        });
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
