import type { RowDataPacket } from "mysql2";

export interface AdminUser extends RowDataPacket {
  _id: number,
  login: string,
  password: string
}