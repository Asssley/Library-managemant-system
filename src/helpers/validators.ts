import { type NewBookDTO } from "../dto/bookDTO.js";
import type SeacrhParamsDTO from "../dto/SearchParamsDTO.js";
import { type Request } from "express";

export const validateSearchParams = function (req: Request): SeacrhParamsDTO {
  const queryObj = req.query

  let year: number | undefined = Number(queryObj.year);

  const searchParams: SeacrhParamsDTO = {
    ...(typeof queryObj.search === "string" && { searchLine: queryObj.search }),
    ...(typeof queryObj.author === "string" && { author: queryObj.author }),
    ...(!isNaN(year) && { year: year }),
    ...((queryObj.sortBy === "title" ||
      queryObj.sortBy === "year" ||
      queryObj.sortBy === "pagesCount" ||
      queryObj.sortBy === "rating" ||
      queryObj.sortBy === "clickCount")
      && { sortBy: queryObj.sortBy }),
    ...((queryObj.sortBy === "asc" ||
      queryObj.sortBy === "desc")
      && { sortDirection: queryObj.sortBy }),
  }

  return searchParams
}

export const validateNewBook = function (req: Request): NewBookDTO | null {
  const book: any = { ...req.body };

  const year = +book.year;
  const pagesCount = +book.pagesCount;
  const rating = book.rating ? +book.rating : undefined;

  book.year = year;
  book.pagesCount = pagesCount;
  book.rating = rating;

  if (req.file?.path) {
    book.imagePath = req.file.path;
  }

  if (
    typeof book.title === "string" &&
    typeof book.author === "string" &&
    Number.isFinite(book.year) &&
    typeof book.description === "string" &&
    Number.isFinite(book.pagesCount) &&
    (book.imagePath === undefined || typeof book.imagePath === "string") &&
    (book.rating === undefined || Number.isFinite(book.rating))
  ) {
    return {
      title: book.title,
      author: book.author,
      year: book.year,
      description: book.description,
      pagesCount: book.pagesCount,
      imagePath: book.imagePath,
      rating: book.rating
    };
  }

  return null;
}
