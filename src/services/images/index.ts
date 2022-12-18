import { Image } from "../../models/core";
import { FinderService } from "../../utils/mixins/finder_service/FinderService";
import { ImagesQuery } from "./query/query";
import { ImageUpdater } from "./updater/updater";

export namespace Images {
  export const Finder = FinderService(Image);
  export const Query = ImagesQuery;
  export const Updater = ImageUpdater;
}
