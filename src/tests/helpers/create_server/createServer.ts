import bodyParser from "body-parser";
import express, { Express } from "express";
import { dataSource } from "../../../app-data-source";
import { Middlewares } from "../../../middlewares";

import { Routers } from "../../../routers";

export const createServer = async () => {
  const app: Express = express();

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(Middlewares.transformRequestToCamelCase);

  app.use("/customer/v1", Routers.customer);
  app.use("/employee/v1", Routers.employee);

  return { app, dataSource };
};
