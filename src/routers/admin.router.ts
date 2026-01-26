import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { uploadImage } from "../initParts.js";
import { 
  renderMainAdminPage, 
  renderMainPageWithSearch, 
  renderAddPage, 
  addBook, 
  removeBook 
} from "../controllers/api/admin.controller.js";

export const adminRouter = Router();

adminRouter.use(authMiddleware)

adminRouter.get("/", renderMainAdminPage);
adminRouter.get("/add", renderAddPage);
adminRouter.get("/search", renderMainPageWithSearch);
adminRouter.post("/api/add", uploadImage.single("image"), addBook);
adminRouter.post("/api/remove", removeBook);