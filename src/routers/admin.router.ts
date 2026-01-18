import { Router, type Request, type  Response } from "express";
import { renderMainAdminPage, renderMainPageWithSearch, renderAddPage, addBook, removeBook } from "../controllers/api/v1/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware)

router.get("/", renderMainAdminPage);

router.get("/add", renderAddPage);

router.get("/search", renderMainPageWithSearch);

router.post("/api/add", addBook);

router.post("/api/remove", removeBook);

export default router;