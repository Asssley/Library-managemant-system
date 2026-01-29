import { type Request, type Response } from "express";
import { bookRepository } from "../../initParts.js";
import { validateSearchParams, validateNewBook } from "../../helpers/validators.js";
import { getPath } from "../../helpers/filesHelpers.js";
import { convertBookToAdminDTO, convertBookToShortDTO } from "../../helpers/convertors.js";

export const renderMainAdminPage = async function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;

  const books = await bookRepository.getBooks(offset);
  const booksDTO = books.map(book => convertBookToAdminDTO(book));

  return res.render(getPath("../view/pages/admin-main.ejs"), booksDTO);
}

export const renderMainPageWithSearch = async function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;

  const searchParams = validateSearchParams(req);

  const books = await bookRepository.searchBooks(offset, searchParams);
  const booksDTO = books.map(book => convertBookToAdminDTO(book));

  return res.render(getPath("../view/pages/admin-main.ejs"), booksDTO);
}

export const renderAddPage = async function (req: Request, res: Response) {
  return res.render(getPath("../view/pages/add-page.ejs"));
}

export const addBook = async function (req: Request, res: Response) {
  const book = validateNewBook(req);
  if (book) {
    await bookRepository.addBook(book);
    return res.status(201).json({ ok: true });
  }

  return res.status(400).json({ error: "Bad request" })
}

export const removeBook = async function (req: Request, res: Response) {
  const bookId = Number(req.body.id);
  if (isNaN(bookId)) {
    return res.status(400).json({ error: "Bad request", message: "Id must be a number" })
  }

  const result = await bookRepository.removeBook(bookId);

  return res.status(200).json({ ok: result });
}