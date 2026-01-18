import type { RowDataPacket } from "mysql2";

export interface Book extends RowDataPacket {
  id: number,
  title: string,
  author: string,
  year: number,
  description: string,
  imagePath?: string,
  pagesCount: number,
  rating?: number,
}