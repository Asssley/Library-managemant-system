import { type Request, type Response } from "express";
import { bookRepository } from "../../initParts.js";
import { validateSearchParams, validateNewBook } from "../../helpers/validators.js";
import { getPath } from "../../helpers/filesHelpers.js";
import { convertBookToAdminDTO, toSearchParams } from "../../helpers/convertors.js";
import fs from "fs";

export const renderMainAdminPage = async function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;

  const books = await bookRepository.getBooks(offset);
  const booksDTO = books.map(book => convertBookToAdminDTO(book));

  const allBooksCount = await bookRepository.getBooksCount();

  return res.render(getPath("../view/pages/admin-main.ejs"), { books: booksDTO, queryString: "", allBooksCount, offset });
}

export const renderMainPageWithSearch = async function (req: Request, res: Response) {
  let offset = Number(req.query.offset);
  offset = isNaN(offset) ? 0 : offset;

  const searchParams = validateSearchParams(req);

  const books = await bookRepository.searchBooks(offset, searchParams);
  const booksDTO = books.map(book => convertBookToAdminDTO(book));

  const allBooksCount = await bookRepository.getBooksCount();

  const queryString = new URLSearchParams(toSearchParams(searchParams)).toString();
  return res.render(getPath("../view/pages/admin-main.ejs"), { books: booksDTO, allBooksCount, queryString, offset });
}

export const renderAddPage = async function (req: Request, res: Response) {
  return res.render(getPath("../view/pages/add-page.ejs"));
}

export const addBook = async function (req: Request, res: Response) {
  try {
    const book = validateNewBook(req);
    if (book) {
      const newBookID = await bookRepository.addBook(book);
      return res.status(201).json({ id: newBookID });
    }

    return res.status(400).json({ error: "Bad request" })
  } catch (error) {

    if (error instanceof Error && "code" in error) {
      switch (error.code) {

        case "ER_DUP_ENTRY":
          return res.status(409).json({
            error: "Record already exists"
          });

        case "ER_DATA_TOO_LONG":
          return res.status(400).json({
            error: "Value too long"
          });

        case "ER_WARN_DATA_OUT_OF_RANGE":
          return res.status(400).json({
            error: "Number out of range"
          });
      }
    }

    throw new Error("Add book error", { cause: error });
  }
}

export const removeBook = async function (req: Request, res: Response) {
  try {
    const bookId = Number(req.params.id);
    if (isNaN(bookId)) {
      return res.status(400).json({ error: "Bad request", message: "Id must be a number" })
    }

    const book = await bookRepository.getBookById(bookId);
    if (book?.imagePath) {
      fs.unlink(getPath(["..", book.imagePath]), err => {
        if (err) {
          throw new Error("Remove book image error", { cause: err });
        }
      });
    }

    const result = await bookRepository.removeBook(bookId);

    return res.status(200).json({ ok: result });
  } catch (error) {
    throw new Error("Remove book error", { cause: error });
  }
}