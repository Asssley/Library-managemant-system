import type { Book } from "../db/models/Book.js"

/**
 * DTO for transport books in response
 */
export type FullBookDTO = Omit<Book, "clickCount">;

/**
 * DTO for creating new book
 */
export type NewBookDTO = Omit<Book, "id" | "clickCount">;

/**
 * DTO for transport book info partialy 
 */
export type ShortBookDTO = Pick<Book, "id" | "title" | "author" | "imagePath">;

/**
 * DTO for transport book info to admin table 
 */
export type AdminBookDTO = Omit<Book, "description" | "pagesCount" | "rating">;