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
// catalogRouter.post("/specifications", ...specificationHandlers.create);
// catalogRouter.patch("/specifications/:id", ...specificationHandlers.update);
catalogRouter.get("/specifications", ...specificationHandlers.list);
// catalogRouter.delete("/specifications/:id", ...specificationHandlers.remove);
catalogRouter.get("/specifications/:id", ...specificationHandlers.show);
