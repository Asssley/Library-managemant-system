import { type Book } from "../db/models/Book.js"
import { type BookDTO } from "../dto/bookDTO.js";

export const convertBookToDTO = function (book: Book): BookDTO {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    year: book.year,
    description: book.description,
    imagePath: book.imagePath,
    pagesCount: book.pagesCount,
    rating: book.rating
  } as BookDTO;
}