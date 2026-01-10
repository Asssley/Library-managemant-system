import { Router, type Request, type Response } from "express";
import { renderMainPage, renderBookPage, reserveBook, increaseTapsCount } from "../controllers/api/v1/user.controller.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  renderMainPage(req, res);
});

router.get("/books/:bookId", (req: Request, res: Response) => {
  renderBookPage(req, res);
});

router.post("/api/reserve-book", (req: Request, res: Response) => {
  reserveBook(req,res);
});


router.post("/api/increase-taps", (req: Request, res: Response) => {
  increaseTapsCount(req, res);
});

export default router;