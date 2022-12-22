import { Item } from "../../../models/catalog";
import { Image } from "../../../models/core";

export class ImageCreator {
  image: Image = new Image();

  constructor({
    fileName,
    item,
    position,
    src,
  }: {
    fileName: string;
    src: string;
    item: Item;
    position: number;
  }) {
    this.image.fileName = fileName;
    this.image.item = item;
    this.image.position = position;
    this.image.src = src;
  }

  async create() {
    return this.image.save();
  }
}
