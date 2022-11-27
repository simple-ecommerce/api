import { Router } from "express";
import { itemHandlers } from "../../../apps/employee/v1/catalog/handlers/item_handlers";
import { specificationHandlers } from "../../../apps/employee/v1/catalog/handlers/specification_handlers";

export const catalogRouter = Router();

//items
catalogRouter.post("/items", ...itemHandlers.create);
catalogRouter.patch("/items/:id", ...itemHandlers.update);
catalogRouter.get("/items", ...itemHandlers.list);
catalogRouter.delete("/items/:id", ...itemHandlers.remove);
catalogRouter.get("/items/:id", ...itemHandlers.show);

//specification categories
catalogRouter.post(
  "/specification_categories",
  ...specificationHandlers.create
);
catalogRouter.patch(
  "/specification_categories/:id",
  ...specificationHandlers.update
);
catalogRouter.get("/specification_categories", ...specificationHandlers.list);
catalogRouter.delete(
  "/specification_categories/:id",
  ...specificationHandlers.remove
);
catalogRouter.get(
  "/specification_categories/:id",
  ...specificationHandlers.show
);

catalogRouter.post(
  "/specification_categories/:specification_category_id/specifications",
  ...specificationHandlers.options.create
);

catalogRouter.delete(
  "/specification_categories/:specification_category_id/specifications/:specification_id",
  ...specificationHandlers.options.remove
);
