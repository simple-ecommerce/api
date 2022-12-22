import { Serializer } from "../utils/mixins/serializer/Serializer";
import { imageSerializer } from "./image_serializer";
import { specificationCategorySerializer } from "./specification_category_serializer";

export namespace Serializers {
  export const SpecificationCategory = Serializer(
    specificationCategorySerializer
  );
  export const Image = Serializer(imageSerializer);
}
