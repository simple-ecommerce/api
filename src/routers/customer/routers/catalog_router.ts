import { Router } from "express";
import { itemHandlers } from "../../../apps/customer/v1/catalog/handlers/item_handlers";

export const catalogRouter = Router();

catalogRouter.get("/items", ...itemHandlers.list);
