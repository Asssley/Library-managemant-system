import type NewBookDTO from "../dto/NewBookDTO.js";
import type BookDTO from "../dto/BookDTO.js";
import type SeacrhParamsDTO from "../dto/SearchParamsDTO.js";

export default interface IBookRepository {
  /**
   * Get up to 20 first books wich stay next to skipped ones 
   * @param offset Offset from start of book colection that will be skipped
   */
  getBooks(offset:number, searchParams: SeacrhParamsDTO): Promise<BookDTO[]>;

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
   * 
   * @param book Book that need to be added
   */
  addBook(book: NewBookDTO): Promise<number>;

  /**
   * 
   * @param id Book's id that need to be removed
   */
  removeBook(id: number): Promise<boolean>;

  /**
   * 
   * @param id Book's id that need to be removed
   */
  increaseTapsCount(id: number): Promise<boolean>;
}