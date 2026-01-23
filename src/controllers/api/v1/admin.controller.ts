import { type Request, type Response } from "express";
import path from "path";
import { bookRepository } from "../../../initParts.js";
import { validateSearchParams, validateNewBook } from "../../../helpers/validators.js";

export const renderMainAdminPage = async function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;

  const books = await bookRepository.getBooks(offset)
  res.render(path.join(__dirname, "../../views/pages/admin-main.ejs"), books);
}

export const renderMainPageWithSearch = async function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;

  const searchParams = validateSearchParams(req);

  const books = await bookRepository.searchBooks(offset, searchParams)
  res.render(path.join(__dirname, "../../views/pages/admin-main.ejs"), books);
}

export const renderAddPage = async function (req: Request, res: Response) {
  res.render(path.join(__dirname, "../../views/pages/add-page.ejs"));
}

export const addBook = async function (req: Request, res: Response) {
  const book = validateNewBook(req);
  if (book) {
    await bookRepository.addBook(book);
    res.status(201).json({ ok: true });
  }

  res.status(400).json({ error: "Bad request" })
}

export const removeBook = async function (req: Request, res: Response) {
  const bookId = Number(req.body.id);
  if (isNaN(bookId)) {
    res.status(400).json({ error: "Bad request", message: "Id must be a number" })
  }

  const result = await bookRepository.removeBook(bookId);

  res.status(200).json({ ok: result });
}