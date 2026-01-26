import { type Request, type Response } from "express";
import { bookRepository } from "../../../initParts.js";
import { validateSearchParams } from "../../../helpers/validators.js";
import { getPath } from "../../../helpers/filesHelpers.js";

export const renderMainPage = async function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;

  const books = await bookRepository.getBooks(offset)
  return res.render(getPath("../view/pages/main.ejs"), books);
}

export const renderBookPage = async function (req: Request, res: Response) {
  const bookId = Number(req.params.id);

  if (isNaN(bookId)) {
    return res.render(getPath("../view/pages/404.ejs"));
  }

  const book = await bookRepository.getBookById(bookId);
  return res.render(getPath("../view/pages/book.ejs"), book ?? undefined);
}

export const renderMainPageWithSearch = async function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;

  const searchParams = validateSearchParams(req);

  const books = await bookRepository.searchBooks(offset, searchParams)
  return res.render(getPath("../view/pages/smain.ejs"), books);
}

export const increaseTapsCount = async function (req: Request, res: Response) {
  const bookId = Number(req.params.id);

  if (isNaN(bookId)) {
    return res.status(404).json({ error: "Not found" });
  }

  const result = await bookRepository.increaseTapsCount(bookId);
  if (result) {
    return res.status(200).json({ ok: true });
  }
  return res.status(404).json({ error: "Not found" });
}