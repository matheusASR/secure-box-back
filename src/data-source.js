import { DataSource } from "typeorm";
import path from "path";
import 'reflect-metadata';
import "dotenv/config";

const settings = () => {
  const entitiesPath = path.join(__dirname, "./entities/**.{ts,js}");
  const migrationPath = path.join(__dirname, "./migrations/**.{ts,js}");

  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");

  return {
    type: "postgres",
    url: dbUrl,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationPath],
  };
};

const AppDataSource = new DataSource(settings());

export { AppDataSource };