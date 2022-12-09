import { Serializer } from "../utils/mixins/serializer/Serializer";
import { specificationCategorySerializer } from "./specification_category_serializer";

export namespace Serializers {
  export const SpecificationCategory = Serializer(
    specificationCategorySerializer
  );
}
