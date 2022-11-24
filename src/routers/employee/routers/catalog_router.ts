import { Router } from "express";
import { itemHandlers } from "../../../apps/employee/v1/catalog/handlers/item_handlers";

export const catalogRouter = Router();

//items
catalogRouter.post("/items", ...itemHandlers.create);
catalogRouter.patch("/items/:id", ...itemHandlers.update);
catalogRouter.get("/items", ...itemHandlers.list);
catalogRouter.get("/items/:id", ...itemHandlers.show);
