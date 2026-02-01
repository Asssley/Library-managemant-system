import type { RowDataPacket } from "mysql2";

export interface Count extends RowDataPacket {
  count: number
}