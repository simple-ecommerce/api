import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const app = new DataSource({
  type: "postgres",
  host: "localhost",
  port: process.env.TYPEORM_PORT ? Number(process.env.TYPEORM_PORT) : 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  logging: true,
  synchronize: false,
});

const tests = new DataSource({
  type: "sqlite",
  database: "test",
  dropSchema: true,
  synchronize: true,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  logging: false,
  name: "testConnection",
});

export const dataSource = process.env.JEST_WORKER_ID ? tests : app;
