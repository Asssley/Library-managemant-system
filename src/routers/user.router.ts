import { Router } from "express";
import { renderMainPage, renderBookPage, renderMainPageWithSearch,increaseTapsCount } from "../controllers/api/v1/user.controller.js";

const router = Router();

router.get("/", renderMainPage);

router.get("/books/:bookId", renderBookPage);

router.get("/search", renderMainPageWithSearch);

router.post("/api/increase-taps", increaseTapsCount);

export default router;