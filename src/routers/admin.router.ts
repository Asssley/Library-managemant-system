import { Router, type Request, type  Response } from "express";
import { renderMainAdminPage, renderAddPage, addBook, removeBook } from "../controllers/api/v1/admin.controller.js";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  renderMainAdminPage(req, res);
});

router.post("/add", (req: Request, res: Response) => {
  renderAddPage(req,res);
});

router.post("/api/add", (req: Request, res: Response) => {
  addBook(req,res);
});

router.post("/api/remove", (req: Request, res: Response) => {
  removeBook(req, res);
});

export default router;