import { type Book } from "../db/models/Book.js"
import { type FullBookDTO, type ShortBookDTO } from "../dto/bookDTO.js";

export const convertBookToFullDTO = function (book: Book): FullBookDTO {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    year: book.year,
    description: book.description,
    imagePath: book.imagePath,
    pagesCount: book.pagesCount,
    rating: book.rating
  } as FullBookDTO;
}

export const convertBookToShortDTO = function (book: Book): ShortBookDTO {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    imagePath: book.imagePath,
    rating: book.rating
  } as ShortBookDTO;
}

export const convertBookToAdminDTO = function (book: Book): ShortBookDTO {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    imagePath: book.imagePath,
    clickCount: book.clickCount
  } as ShortBookDTO;
}

export const toSearchParams = function(obj: object) {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  return params;
}