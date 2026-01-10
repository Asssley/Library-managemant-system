import type BookDTO from "../dto/BookDTO.js";
import type NewBookDTO from "../dto/NewBookDTO.js";
import type SeacrhParamsDTO from "../dto/SearchParamsDTO.js";
import type IBookRepository from "./book.repository.interface.js";

export class BookRepository implements IBookRepository {
  addBook(book: NewBookDTO): number {

  }

  getBooks(offset: number, searchParams: SeacrhParamsDTO[]): BookDTO[] {
  
  }

  removeBook(id: number): boolean {

  }

  increaseTapsCount(id: number): boolean {
    
  }
}