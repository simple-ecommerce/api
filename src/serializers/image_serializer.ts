import { Image } from "../models/core";

export const imageSerializer = (image: Image) => ({
  id: image.id,
  fileName: image.fileName,
  src: image.src,
  position: image.position,
  createdAt: image.createdAt,
  updatedAt: image.updatedAt,
});
