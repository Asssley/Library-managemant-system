import { Router } from "express";
import { renderMainAdminPage, renderMainPageWithSearch, renderAddPage, addBook, removeBook } from "../controllers/api/v1/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { uploadImage } from "../initParts.js";

const router = Router();

router.use(authMiddleware)

router.get("/", renderMainAdminPage);

router.get("/add", renderAddPage);

router.get("/search", renderMainPageWithSearch);

router.post("/api/add", uploadImage.single("image"), addBook);

router.post("/api/remove", removeBook);

export default router;