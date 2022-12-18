import { dataSource } from "../../../app-data-source";
import { Image } from "../../../models/core";
import { ImagesQuery } from "../query/query";

export class ImageUpdater {
  image: Image;
  private queryRunner = dataSource.createQueryRunner();

  constructor(image: Image) {
    this.image = image;
  }

  async update({ index }: { index: number }) {
    const previousIndexedImage = await this.findPreviousIndexedImage(index);
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      if (previousIndexedImage) {
        previousIndexedImage.index = this.image.index;
        await previousIndexedImage.save();
      }

      this.image.index = index;
      await this.image.save();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
    } finally {
      await this.queryRunner.release();
    }

    return this.image;
  }

  private findPreviousIndexedImage(index: number) {
    return new ImagesQuery().byItem(this.image.item).byIndex(index).one();
  }
}
