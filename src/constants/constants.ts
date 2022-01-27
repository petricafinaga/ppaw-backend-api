import { ConnectionOptions } from "mysql2";

export const SQL_SETTINGS: ConnectionOptions = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "sa",
  database: "magazin_online",
  multipleStatements: true,
} as const;

export const DATABASES: any = {
  ORM: "orm",
  MySQL: "mysql",
} as const;

export const DB_SETTINGS: any = {
  database: DATABASES.ORM,
} as const;

export const SERVER_PORT: number = 8080;
