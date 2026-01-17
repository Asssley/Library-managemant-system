import { type Pool } from "mysql2/promise";
import type BookDTO from "../dto/BookDTO.js";
import type NewBookDTO from "../dto/NewBookDTO.js";
import type SeacrhParamsDTO from "../dto/SearchParamsDTO.js";
import type IBookRepository from "./book.repository.interface.js";

export default class BookRepository implements IBookRepository {

  constructor(private readonly pool: Pool) { };

  getBooks(offset: number): BookDTO[] {

  }

  getBookById(id: number): BookDTO {

  }

  searchBooks(offset: number, searchParams?: SeacrhParamsDTO): BookDTO[] {

  }

  addBook(book: NewBookDTO): number {

  }

  removeBook(id: number): boolean {

  }

  increaseTapsCount(id: number): boolean {

  }
}