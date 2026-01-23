import mysql, { type PoolOptions } from "mysql2/promise";
import { getSQL } from "../helpers/filesHelpers.js";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10
} as PoolOptions);

pool.execute(await getSQL("createBooksTable.sql"));
pool.execute(await getSQL("createUsersTable.sql"));