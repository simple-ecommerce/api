import { dataSource } from "../../../app-data-source";
import { Factories } from "../../../database/factories";
import { Item } from "../../../models/catalog";
import { Image } from "../../../models/core";
import { ImageSwapper } from "./swapper";

describe("services#images#swapper", () => {
  beforeAll(async () => {
    await dataSource.initialize();
  });

  describe("given a item", () => {
    let item: Item;

    beforeAll(async () => {
      item = await Factories.Item();
    });

    describe("with two images", () => {
      let image1: Image;
      let image2: Image;

      beforeAll(async () => {
        image1 = await Factories.Image({ position: 1, item });
        image2 = await Factories.Image({ position: 2, item });
      });

      it("should swap positions", async () => {
        await new ImageSwapper(image1, image2).swap();

        await image1.reload();
        await image2.reload();

        expect(image1.position).toEqual(2);
        expect(image2.position).toEqual(1);
      });
    });
  });
  afterAll(async () => {
    await dataSource.close();
  });
});
