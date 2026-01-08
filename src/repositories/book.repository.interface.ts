import type NewBookDTO from "../dto/NewBookDTO.js";
import type BookDTO from "../dto/BookDTO.js";
import type SeacrhParamsDTO from "../dto/SearchParamsDTO.js";

interface BookRepository {
  /**
   * Get up to 20 first books wich stay next to skipped ones 
   * @param offset Offset from start of book colection that will be skipped
   */
  getBooks(offset:number, searchParams: SeacrhParamsDTO[]): BookDTO;

  /**
   * 
   * @param book Book that need to be added
   */
  addBook(book: NewBookDTO): number;

  /**
   * 
   * @param id Book's id that need to be removed
   */
  removeBook(id: number): boolean;

  /**
   * 
   * @param id Book's id that need to be removed
   */
  increaseBookedCount(id: number): boolean;
}