import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Routers } from "./routers";
import { Middlewares } from "./middlewares";
import bodyParser from "body-parser";
import { dataSource } from "./app-data-source";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Middlewares.transformRequestToCamelCase);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/customer/v1", Routers.customer);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
