import { type Request, type Response } from "express";
import path from "path";
import { bookRepository } from "../../../buildApp.js";
import type SeacrhParamsDTO from "../../../dto/SearchParamsDTO.js";


export const renderMainPage = function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;

  const books = bookRepository.getBooks(offset)
  res.render(path.join(__dirname, "../views/main.ejs"), books);
}

export const renderBookPage = function (req: Request, res: Response) {
  const bookId = Number(req.params.id);

  if (isNaN(bookId)) {
    res.render(path.join(__dirname, "../views/404.ejs"));
  }

  const book = bookRepository.getBookById(bookId);
  res.render(path.join(__dirname, "../views/book.ejs"), book);
}

export const renderMainPageWithSearch = function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;
  let year: number | undefined = Number(req.query.year);

  const searchParams: SeacrhParamsDTO = {
    ...(typeof req.query.search === "string" && { searchLine: req.query.search }),
    ...(typeof req.query.author === "string" && { author: req.query.author }),
    ...(!isNaN(year) && { year: year }),
    ...((req.query.sortBy === "title" ||
      req.query.sortBy === "year" ||
      req.query.sortBy === "pagesCount" ||
      req.query.sortBy === "rating" ||
      req.query.sortBy === "clickCount")
      && { sortBy: req.query.sortBy }),
    ...((req.query.sortBy === "asc" ||
      req.query.sortBy === "desc")
      && { sortDirection: req.query.sortBy }),
  }

  const books = bookRepository.searchBooks(offset, searchParams)
  res.render(path.join(__dirname, "../views/main.ejs"), books);
}

export const increaseTapsCount = function (req: Request, res: Response) {
  const bookId = Number(req.params.id);

  if (isNaN(bookId)) {
    res.status(404).json({ error: "Not found" });
  }

  const result = bookRepository.increaseTapsCount(bookId);
  if (result) {
    res.status(200).json({ ok: true });
  }
  res.status(404).json({ error: "Not found" });
}