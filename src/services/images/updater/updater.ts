import { Image } from "../../../models/core";

export class ImageUpdater {
  image: Image;

  constructor(image: Image) {
    this.image = image;
  }

  async update({ position }: { position: number }) {
    this.image.position = position;

    return this.image.save();
  }
}
