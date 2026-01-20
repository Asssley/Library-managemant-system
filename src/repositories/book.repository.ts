import { type Pool, type ResultSetHeader } from "mysql2/promise";
import type BookDTO from "../dto/BookDTO.js";
import type NewBookDTO from "../dto/NewBookDTO.js";
import type SeacrhParamsDTO from "../dto/SearchParamsDTO.js";
import type IBookRepository from "./book.repository.interface.js";
import type { Book } from "../db/models/Book.js";
import { convertBookToDTO } from "../helpers/convertors.js";
import { getSQL } from "../helpers/filesHelpers.js";

export default class BookRepository implements IBookRepository {

  constructor(private readonly pool: Pool) { };

  async getBooks(offset: number): Promise<BookDTO[]> {
    const sql = await getSQL("../db/queries/getBooks.sql");
    const [result] = await this.pool.execute<Book[]>(sql, [offset]);

    const books = result.map((book => convertBookToDTO(book)));
    return books;
  }

  async getBookById(id: number): Promise<BookDTO | null> {
    const sql = await getSQL("../db/queries/getBookById.sql");
    const [result] = await this.pool.execute<Book[]>(sql, [id]);

    if (result.length !== 0) {
      const book = convertBookToDTO(result[0] as Book);
      return book;
    }

    return null;
  }

  async searchBooks(offset: number, searchParams?: SeacrhParamsDTO): Promise<BookDTO[]> {
    let sql = await getSQL("../db/queries/searchBooks.sql");
    const conditions = [];
    const params = [];

    if (typeof searchParams?.searchLine === "string") {
      conditions.push('title LIKE ?');
      params.push(`%${searchParams.searchLine}%`);
    }

    if (typeof searchParams?.author === "string") {
      conditions.push('author LIKE ?');
      params.push(`%${searchParams.author}%`);
    }

    if (typeof searchParams?.year === "string") {
      conditions.push('year = ?');
      params.push(searchParams.year);
    }

    const where = conditions.length > 0 ? "WHERE " + conditions.join(" AND ") : "";
    sql += ` ${where}`;

    const allowedSorts = ["title", "author", "year", "pagesCount"];
    const sortBy = allowedSorts.includes(searchParams?.sortBy ?? "") ? searchParams!.sortBy! : "title";

    const sortDirection = searchParams?.sortDirection?.toUpperCase() === "DESC" ? "DESC" : "ASC";

    sql += ` ORDER BY ${sortBy} ${sortDirection}`;

    sql += ` LIMIT 20 OFFSET ?`;
    params.push(offset);

    const [result] = await this.pool.execute<Book[]>(sql, params);

    const books = result.map((book => convertBookToDTO(book)));
    return books;
  }

  async addBook(book: NewBookDTO): Promise<number> {
    const sql = await getSQL("../db/queries/addBook.sql");
    const [result] = await this.pool.execute<ResultSetHeader>(sql, [
      book.title,
      book.author,
      book.description,
      book.pagesCount,
      book.year,
      typeof book.imagePath === "string" ? [book.imagePath] : null,
      typeof book.rating === "string" ? [book.rating] : null
    ]);

    return result.insertId;
  }

  async removeBook(id: number): Promise<boolean> {
    const sql = await getSQL("../db/queries/removeBook.sql");
    const [result] = await this.pool.execute<ResultSetHeader>(sql, [id]);

    return result.affectedRows !== 0;
  }

  async increaseTapsCount(id: number): Promise<boolean> {
    const sql = await getSQL("../db/queries/increaseTaps.sql");
    const [result] = await this.pool.execute<ResultSetHeader>(sql, [id]);

    return result.affectedRows !== 0;
  }
}