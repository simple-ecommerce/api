import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  logging: true,
  synchronize: false,
});
