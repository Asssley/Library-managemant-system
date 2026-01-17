import { type Request, type Response } from "express";
import path from "path";
import { bookRepository } from "../../../buildApp.js";
import { validateSearchParams, validateNewBook } from "../../../helpers/validators.js";

export const renderMainAdminPage = function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;

  const books = bookRepository.getBooks(offset)
  res.render(path.join(__dirname, "../views/admin-main.ejs"), books);
}

export const renderMainPageWithSearch = function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;

  const searchParams = validateSearchParams(req);

  const books = bookRepository.searchBooks(offset, searchParams)
  res.render(path.join(__dirname, "../views/admin-main.ejs"), books);
}

export const renderAddPage = function (req: Request, res: Response) {
  res.render(path.join(__dirname, "../views/add-page.ejs"));
}

export const addBook = function (req: Request, res: Response) {
  const book = validateNewBook(req);
  if (book) {
    bookRepository.addBook(book);
    res.status(201).json({ ok: true });
  }

  res.status(400).json({ error: "Bad request" })
}

export const removeBook = function (req: Request, res: Response) {
  const bookId = Number(req.body.id);
  if (isNaN(bookId)) {
    res.status(400).json({ error: "Bad request", message: "Id must be a number" })
  }

  const result = bookRepository.removeBook(bookId);

  res.status(200).json({ ok: result });
}