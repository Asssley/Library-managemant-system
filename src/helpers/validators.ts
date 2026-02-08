import { type NewBookDTO } from "../dto/bookDTO.js";
import type SeacrhParamsDTO from "../dto/SearchParamsDTO.js";
import { type Request } from "express";

export const validateSearchParams = function (req: Request): SeacrhParamsDTO {
  const queryObj = req.query

  const yearNum = Number(queryObj.year)

  const searchParams: SeacrhParamsDTO = {
    ...(typeof queryObj.search === "string" && queryObj.search.trim() !== "" && { searchLine: queryObj.search }),
    ...(typeof queryObj.author === "string" && queryObj.author.trim() !== "" && { author: queryObj.author }),
    ...(Number.isInteger(yearNum) && yearNum > 0 && { year: yearNum }),
    ...((queryObj.sortBy === "title" ||
      queryObj.sortBy === "year" ||
      queryObj.sortBy === "pagesCount" ||
      queryObj.sortBy === "rating" ||
      queryObj.sortBy === "clickCount")
      && { sortBy: queryObj.sortBy }),
    ...((queryObj.sortDirection === "asc" ||
      queryObj.sortDirection === "desc")
      && { sortDirection: queryObj.sortDirection }),
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
    (typeof book.title === "string" && book.title !== "") &&
    (typeof book.author === "string" && book.author !== "") &&
    Number.isFinite(book.year) &&
    (typeof book.description === "string" && book.description !== "") &&
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
