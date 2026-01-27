import { type NewBookDTO } from "../dto/bookDTO.js";
import { type BookDTO } from "../dto/bookDTO.js";
import type SeacrhParamsDTO from "../dto/SearchParamsDTO.js";

export default interface IBookRepository {
  /**
   * Get up to 20 first books wich stay next to skipped ones 
   * @param offset Offset from start of book colection that will be skipped
   */
  getBooks(offset: number, searchParams: SeacrhParamsDTO): Promise<BookDTO[]>;

  /**
   * Get book by it's id
   * @param id Id book that needed to be found
   */
  getBookById(id: number): Promise<BookDTO | null>;

  /**
   * Get up to 20 first books wich stay next to skipped ones 
   * @param offset Offset from start of book colection that will be skipped
   * @param searchParams Object with params which are needed to use in search
   */
  searchBooks(offset: number, searchParams?: SeacrhParamsDTO): Promise<BookDTO[]>;

  /**
   * Add new book
   * @param book Book that need to be added
   */
  addBook(book: NewBookDTO): Promise<number>;

  /**
   * Remove book 
   * @param id Book's id that need to be removed
   */
  removeBook(id: number): Promise<boolean>;

  /**
   * Inrease count of taps of specific book
   * @param id Book's id that taps couny need to be increased
   */
  increaseTapsCount(id: number): Promise<boolean>;
}