import { getSQL } from "../helpers/filesHelpers.js";
import { type AdminUser } from "../db/models/AdminUser.js";
import { type Pool } from "mysql2/promise";

export default class AdminRepository {
  constructor(private readonly pool: Pool) { };

  async checkUser(login: string, password: string): Promise<boolean> {
    const sql = await getSQL("../db/queries/checkUser.sql");
    const [result] = await this.pool.execute<AdminUser[]>(sql, [login, password]);

    return result.length !== 0;
  }
}