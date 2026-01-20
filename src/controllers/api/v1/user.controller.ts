import { type Request, type Response } from "express";
import path from "path";
import { bookRepository } from "../../../buildApp.js";
import { validateSearchParams } from "../../../helpers/validators.js";

export const renderMainPage = async function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;

  const books = await bookRepository.getBooks(offset)
  res.render(path.join(__dirname, "../views/main.ejs"), books);
}

export const renderBookPage = async function (req: Request, res: Response) {
  const bookId = Number(req.params.id);

  if (isNaN(bookId)) {
    res.render(path.join(__dirname, "../views/404.ejs"));
  }

  const book = await bookRepository.getBookById(bookId);
  res.render(path.join(__dirname, "../views/book.ejs"), book ?? undefined);
}

export const renderMainPageWithSearch = async function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;

  const searchParams = validateSearchParams(req);

  const books = await bookRepository.searchBooks(offset, searchParams)
  res.render(path.join(__dirname, "../views/main.ejs"), books);
}

export const increaseTapsCount = async function (req: Request, res: Response) {
  const bookId = Number(req.params.id);

  if (isNaN(bookId)) {
    res.status(404).json({ error: "Not found" });
  }

  const result = await bookRepository.increaseTapsCount(bookId);
  if (result) {
    res.status(200).json({ ok: true });
  }
  res.status(404).json({ error: "Not found" });
}