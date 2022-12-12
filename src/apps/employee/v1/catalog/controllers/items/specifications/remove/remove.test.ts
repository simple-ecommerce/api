import { Factories } from "../../../../../../../../database/factories";
import { Company, Employee } from "../../../../../../../../models/core";
import {
  closeDbConnection,
  createAccessToken,
  createEmployeeWithCompany,
  createServer,
} from "../../../../../../../../tests/helpers";
import { Express } from "express-serve-static-core";
import request from "supertest";
import {
  Item,
  ItemSpecification,
  Specification,
} from "../../../../../../../../models/catalog";

let app: Express;

describe("employee#catalog#items#specifications#remove#DELETE", () => {
  const getUrl = ({
    itemId,
    specificationId,
    companyId,
  }: {
    itemId: number;
    specificationId: number;
    companyId: number;
  }) =>
    `/employee/v1/catalog/items/${itemId}/specifications/${specificationId}?company_id=${companyId}`;

  beforeEach(async () => {
    const server = await createServer();
    app = server.app;
  });

  describe("the employee is authenticated", () => {
    let company: Company;
    let employee: Employee;
    let accessToken: string;

    beforeEach(async () => {
      company = await Factories.Company();
      employee = await createEmployeeWithCompany({ company });
      accessToken = await createAccessToken({ employee });
    });

    describe("the item belongs to the employee company", () => {
      let item: Item;
      beforeEach(async () => {
        item = await Factories.Item({ company });
      });
      describe("the item specification belongs to the item", () => {
        let specification: Specification;
        let itemSpecification: ItemSpecification;

        beforeEach(async () => {
          specification = await Factories.Specification({
            category: await Factories.SpecificationCategory({ company }),
          });
          itemSpecification = await Factories.ItemSpecification({
            item,
            specification,
          });
        });
        it("should return a 200 status", async () => {
          const response = await request(app)
            .delete(
              getUrl({
                itemId: item.id,
                specificationId: specification.id,
                companyId: company.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`);

          expect(response.status).toBe(200);
        });

        it("should remove the item specification", async () => {
          await request(app)
            .delete(
              getUrl({
                itemId: item.id,
                specificationId: specification.id,
                companyId: company.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`);

          const itemSpecification = await ItemSpecification.findOne({
            where: {
              item: { id: item.id },
              specification: { id: specification.id },
            },
          });

          expect(itemSpecification).toBeNull();
        });

        it("should return the removed item specification", async () => {
          const response = await request(app)
            .delete(
              getUrl({
                itemId: item.id,
                specificationId: specification.id,
                companyId: company.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`);

          expect(response.body.specification_id).toEqual(specification.id);
          expect(response.body.price_extra).toEqual(
            itemSpecification.priceExtra
          );
          expect(response.body.item_id).toEqual(item.id);
        });
      });
      describe("the item specification don't belongs to the item", () => {
        let specification: Specification;
        let itemSpecification: ItemSpecification;

        beforeEach(async () => {
          specification = await Factories.Specification({
            category: await Factories.SpecificationCategory({ company }),
          });
          itemSpecification = await Factories.ItemSpecification({
            specification,
          });
        });

        it("should return a 404 status", async () => {
          const response = await request(app)
            .delete(
              getUrl({
                itemId: itemSpecification.itemId,
                specificationId: itemSpecification.specificationId,
                companyId: company.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`);

          expect(response.status).toBe(404);
        });
      });
    });
    describe("the item don't belongs to the employee company", () => {
      let item: Item;
      let itemCompany: Company;

      beforeEach(async () => {
        itemCompany = await Factories.Company();
        item = await Factories.Item({ company: itemCompany });
      });

      describe("the item specification belongs to the item", () => {
        let specification: Specification;

        beforeEach(async () => {
          specification = await Factories.Specification({
            category: await Factories.SpecificationCategory({
              company: itemCompany,
            }),
          });

          await Factories.ItemSpecification({
            item,
            specification,
          });
        });

        it("should return a 404 status", async () => {
          const response = await request(app)
            .delete(
              getUrl({
                itemId: item.id,
                specificationId: specification.id,
                companyId: company.id,
              })
            )
            .set("Authorization", `Bearer ${accessToken}`);

          expect(response.status).toBe(404);
        });
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
