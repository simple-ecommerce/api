import { QueryRunner } from "typeorm";
import { dataSource } from "../../../app-data-source";
import { Image } from "../../../models/core";

export class ImageSwapper {
  imageA: Image;
  imageB: Image;

  constructor(imageA: Image, imageB: Image) {
    this.imageA = imageA;
    this.imageB = imageB;
  }

  async swap(): Promise<void> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();

    const position = this.imageB.position;
    this.imageB.position = this.imageA.position;
    this.imageA.position = position;

    try {
      await this.imageA.save();
      await this.imageB.save();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
