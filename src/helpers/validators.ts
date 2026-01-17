import type NewBookDTO from "../dto/NewBookDTO.js";
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
  const book = req.body;

  if (typeof book.title === "string" && 
      typeof book.author === "string" &&
      typeof book.year === "number" &&
      typeof book.description === "string" &&
      typeof book.pagesCount === "number" &&
      (typeof book.imagePath === "string" || book.year === undefined) &&
      (typeof book.rating === "number" || book.year === undefined)) {
    return book;
  }

  return null;
}
