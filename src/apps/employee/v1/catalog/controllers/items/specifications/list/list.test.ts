import { Factories } from "../../../../../../../../database/factories";
import {
  Item,
  ItemSpecification,
} from "../../../../../../../../models/catalog";
import { Company, Employee } from "../../../../../../../../models/core";
import {
  closeDbConnection,
  createAccessToken,
  createEmployeeWithCompany,
  createServer,
} from "../../../../../../../../tests/helpers";
import { Id, Token } from "../../../../../../../../utils/aliases";
import request from "supertest";
import { Express } from "express-serve-static-core";

let app: Express;

describe("employee#catalog#items#specifications#list_controller#GET", () => {
  beforeAll(async () => {
    const server = await createServer();
    app = server.app;
  });

  const getUrl = ({ itemId, companyId }: { itemId: Id; companyId: Id }) =>
    `/employee/v1/catalog/items/${itemId}/specifications?page=1&per_page=99999&company_id=${companyId}`;

  describe("the employee is authenticated", () => {
    let company: Company;
    let employee: Employee;
    let accessToken: Token;

    beforeAll(async () => {
      company = await Factories.Company();
      employee = await createEmployeeWithCompany({ company });
      accessToken = await createAccessToken({ employee });
    });

    describe("the item belongs to the employee companies", () => {
      let item: Item;

      beforeAll(async () => {
        item = await Factories.Item({ company });
      });

      describe("the item have specifications", () => {
        let specifications: ItemSpecification[];

        beforeAll(async () => {
          specifications = [
            await Factories.ItemSpecification({ item }),
            await Factories.ItemSpecification({ item }),
          ];
        });

        it("should return 200", async () => {
          const response = await request(app)
            .get(getUrl({ itemId: item.id, companyId: company.id }))
            .set("Authorization", `Bearer ${accessToken}`);

          expect(response.status).toBe(200);
        });

        it("should return the item specifications", async () => {
          const response = await request(app)
            .get(getUrl({ itemId: item.id, companyId: company.id }))
            .set("Authorization", `Bearer ${accessToken}`);

          specifications.forEach((specification) => {
            expect(
              response.body.results.map(
                (specification: any) =>
                  `${specification.specification_id}-${specification.item_id}`
              )
            ).toContain(
              `${specification.specificationId}-${specification.itemId}`
            );
          });
        });
      });
    });

    describe("the item don't belong to the employee companies", () => {
      let item: Item;

      beforeAll(async () => {
        item = await Factories.Item();
      });

      it("should return 404", async () => {
        const response = await request(app)
          .get(getUrl({ itemId: item.id, companyId: company.id }))
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.status).toBe(404);
      });
    });
  });

  afterAll(async () => {
    await closeDbConnection();
  });
});
