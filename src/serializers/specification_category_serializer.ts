import { SpecificationCategory } from "../models/catalog";

export const specificationCategorySerializer = (
  specificationCategory: SpecificationCategory
) => ({
  id: specificationCategory.id,
  name: specificationCategory.name,
  description: specificationCategory.description,
  internalName: specificationCategory.internalName,
  createdAt: specificationCategory.createdAt,
  updatedAt: specificationCategory.updatedAt,
  specifications: specificationCategory.specifications.map((specification) => ({
    id: specification.id,
    name: specification.name,
    description: specification.description,
    createdAt: specification.createdAt,
    updatedAt: specification.updatedAt,
    priceExtra: specification?.itemSpecifications?.[0]?.priceExtra,
  })),
});
