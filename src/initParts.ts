import { pool } from "./db/db.js";
import AdminRepository from "./repositories/admin.repository.js";
import BookRepository from "./repositories/book.repository.js";
import multer from "multer";
import { getPath } from "./helpers/filesHelpers.js";

export const uploadImage = multer({dest: getPath("../view/static/bookImages")});

export const bookRepository = new BookRepository(pool);
export const adminRepository = new AdminRepository(pool);
