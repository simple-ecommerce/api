import { Router } from "express";
import { itemHandlers } from "../../../apps/employee/v1/catalog/handlers/item_handlers";
import { specificationCategoriesHandlers } from "../../../apps/employee/v1/catalog/handlers/specification_category_handlers";

export const catalogRouter = Router();

//items
catalogRouter.post("/items", ...itemHandlers.create);
catalogRouter.patch("/items/:id", ...itemHandlers.update);
catalogRouter.get("/items", ...itemHandlers.list);
catalogRouter.delete("/items/:id", ...itemHandlers.remove);
catalogRouter.get("/items/:id", ...itemHandlers.show);
catalogRouter.get(
  "/items/:item_id/specifications",
  ...itemHandlers.specifications.list
);
catalogRouter.post(
  "/items/:item_id/specifications",
  ...itemHandlers.specifications.create
);
catalogRouter.delete(
  "/items/:item_id/specifications/:specification_id",
  ...itemHandlers.specifications.remove
);

//specification categories
catalogRouter.post(
  "/specification_categories",
  ...specificationCategoriesHandlers.create
);
catalogRouter.patch(
  "/specification_categories/:id",
  ...specificationCategoriesHandlers.update
);
catalogRouter.get(
  "/specification_categories",
  ...specificationCategoriesHandlers.list
);
catalogRouter.delete(
  "/specification_categories/:id",
  ...specificationCategoriesHandlers.remove
);
catalogRouter.get(
  "/specification_categories/:id",
  ...specificationCategoriesHandlers.show
);

catalogRouter.post(
  "/specification_categories/:specification_category_id/specifications",
  ...specificationCategoriesHandlers.specifications.create
);

catalogRouter.delete(
  "/specification_categories/:specification_category_id/specifications/:specification_id",
  ...specificationCategoriesHandlers.specifications.remove
);
