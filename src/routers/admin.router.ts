import { Router, type Request, type  Response } from "express";
import { renderMainAdminPage, renderMainPageWithSearch, renderAddPage, addBook, removeBook } from "../controllers/api/v1/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware)

router.get("/", (req: Request, res: Response) => {
  renderMainAdminPage(req, res);
});

router.get("/add", (req: Request, res: Response) => {
  renderAddPage(req,res);
});

router.get("/search", (req: Request, res: Response) => {
  renderMainPageWithSearch(req, res);
});

router.post("/api/add", (req: Request, res: Response) => {
  addBook(req,res);
});

router.post("/api/remove", (req: Request, res: Response) => {
  removeBook(req, res);
});

export default router;