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
  Item,
  ItemSpecification,
  Specification,
} from "../../../../../../../../models/catalog";
import request from "supertest";

let app: Express;

describe("employee#catalog##items#specifications#create_controller#POST", () => {
  const getUrl = ({ itemId }: { itemId: number }) =>
    `/employee/v1/catalog/items/${itemId}/specifications`;

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

    describe("the item belongs to the user company", () => {
      let item: Item;

      beforeAll(async () => {
        item = await Factories.Item({ company });
      });
      describe("the specification belongs to the item company", () => {
        let specification: Specification;

        beforeAll(async () => {
          specification = await Factories.Specification({
            category: await Factories.SpecificationCategory({
              company,
            }),
          });
        });
        it("should return a 201 status", async () => {
          const response = await request(app)
            .post(getUrl({ itemId: item.id }))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
              specification_id: specification.id,
              price_extra: 100,
              company_id: company.id,
            });

          expect(response.status).toBe(201);
        });
        it("should create the item specification", async () => {
          const response = await request(app)
            .post(getUrl({ itemId: item.id }))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
              specification_id: specification.id,
              price_extra: 100,
              company_id: company.id,
            });

          const itemSpecification = await ItemSpecification.findOne({
            where: {
              item: { id: item.id },
              specification: { id: specification.id },
            },
          });
          expect(itemSpecification?.itemId).toBe(item.id);
          expect(itemSpecification?.specificationId).toBe(specification.id);
          expect(itemSpecification?.priceExtra).toBe(100);
        });
        it("should return the item specification", async () => {
          const response = await request(app)
            .post(getUrl({ itemId: item.id }))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
              specification_id: specification.id,
              price_extra: 100,
              company_id: company.id,
            });

          expect(response.body.specification_id).toBe(specification.id);
          expect(response.body.item_id).toBe(item.id);
          expect(response.body.price_extra).toBe(100);
        });
      });
      describe("the specification does not belong to the item company", () => {
        let specification: Specification;

        beforeAll(async () => {
          specification = await Factories.Specification();
        });
        it("should return a 404 status", async () => {
          const response = await request(app)
            .post(getUrl({ itemId: item.id }))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
              specification_id: specification.id,
              price_extra: 100,
              company_id: company.id,
            });

          expect(response.status).toBe(404);
        });
      });
    });
    describe("the item does not belong to the user company", () => {
      let item: Item;
      beforeAll(async () => {
        item = await Factories.Item();
      });

      it("should return a 404 status", async () => {
        const response = await request(app)
          .post(getUrl({ itemId: item.id }))
          .set("Authorization", `Bearer ${accessToken}`)
          .send({
            specification_id: 1,
            price_extra: 100,
            company_id: company.id,
          });

        expect(response.status).toBe(404);
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
