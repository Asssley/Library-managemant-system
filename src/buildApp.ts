import express, { type Express, type Request, type Response } from "express";
import BookRepository from "./repositories/book.repository.js";
import userRouter from "./routers/user.router.js";
import adminRouter from "./routers/admin.router.js";
import { pool } from "./db/scripts.js";

const expressApp: Express = express();

expressApp.use(express.json);

expressApp.use(userRouter);

expressApp.use("/admin", adminRouter)

expressApp.use((req: Request, res: Response) => {
  res.sendStatus(404);
});

export default expressApp;

export const bookRepository = new BookRepository(pool);
