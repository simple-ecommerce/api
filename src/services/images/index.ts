import { Image } from "../../models/core";
import { FinderService } from "../../utils/mixins/finder_service/FinderService";
import { UpdaterService } from "../../utils/mixins/updater_service/UpdaterService";
import { ImageCreator } from "./creator.ts/creator";
import { ImagesQuery } from "./query/query";
import { ImageSwapper } from "./swapper/swapper";

export namespace Images {
  export const Finder = FinderService(Image);
  export const Query = ImagesQuery;
  export const Updater = UpdaterService<"position", typeof Image>(Image);
  export const Swapper = ImageSwapper;
  export const Creator = ImageCreator;
}
