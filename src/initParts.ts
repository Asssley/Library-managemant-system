import { pool } from "./db/db.js";
import AdminRepository from "./repositories/admin.repository.js";
import BookRepository from "./repositories/book.repository.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "view/static/bookImages");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); 
    const base = path.basename(file.originalname, ext);
    cb(null, `${base}-${Date.now()}${ext}`);
  }
});

export const uploadImage = multer({ storage });
export const bookRepository = new BookRepository(pool);
export const adminRepository = new AdminRepository(pool);
