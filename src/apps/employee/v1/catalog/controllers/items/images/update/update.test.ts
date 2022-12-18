import {
  closeDbConnection,
  createAccessToken,
  createEmployeeWithCompany,
  createServer,
} from "../../../../../../../../tests/helpers";
import { Express } from "express-serve-static-core";
import { Company, Employee, Image } from "../../../../../../../../models/core";
import { Factories } from "../../../../../../../../database/factories";
import { Item } from "../../../../../../../../models/catalog";
import request from "supertest";
import { Id } from "../../../../../../../../utils/aliases";

let app: Express;

describe("employee#v1#catalog#items#images#update#PATCH", () => {
  const buildUrl = ({ imageId, itemId }: { itemId: Id; imageId: Id }) =>
    `/employee/v1/catalog/items/${itemId}/images/${imageId}`;

  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the employee is authenticated", () => {
    let employee: Employee;
    let company: Company;
    let accessToken: string;
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
          image = await Factories.Image({ item, index: 0 });
        });

        describe("there is a the previous indexed image", () => {
          let previousImage: Image;
          beforeEach(async () => {
            previousImage = await Factories.Image({ item, index: 1 });
          });
          it("should swap values with the previous indexed image", async () => {
            await request(app)
              .patch(
                buildUrl({
                  itemId: item.id,
                  imageId: image.id,
                })
              )
              .set("Authorization", `Bearer ${accessToken}`)
              .send({
                company_id: company.id,
                index: 1,
              });

            await previousImage.reload();
            expect(previousImage.index).toBe(0);
          });
        });
        it("should return a 200 status", async () => {
          const response = await request(app)
            .patch(
              buildUrl({
                itemId: item.id,
                imageId: image.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
              company_id: company.id,
              index: 1,
            });

          expect(response.status).toBe(200);
        });
        it("should update the image", async () => {
          await request(app)
            .patch(
              buildUrl({
                itemId: item.id,
                imageId: image.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
              company_id: company.id,
              index: 1,
            });

          await image.reload();

          expect(image.index).toBe(1);
        });
        it("should return the updated image", async () => {
          const response = await request(app)
            .patch(
              buildUrl({
                itemId: item.id,
                imageId: image.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
              company_id: company.id,
              index: 1,
            });

          expect(response.body.id).toEqual(image.id);
        });
      });
      describe("the image don't belongs to the item", () => {
        let image: Image;
        beforeEach(async () => {
          image = await Factories.Image();
        });
        it('should return a 404 "not found" error', async () => {
          const response = await request(app)
            .patch(
              buildUrl({
                itemId: item.id,
                imageId: image.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
              company_id: company.id,
              index: 1,
            });

          expect(response.status).toBe(404);
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
            .patch(
              buildUrl({
                itemId: item.id,
                imageId: image.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
              company_id: company.id,
              index: 1,
            });

          expect(response.status).toBe(404);
        });
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
