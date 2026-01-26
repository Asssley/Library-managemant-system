import { Router } from "express";
import { 
  renderMainPage, 
  renderBookPage, 
  renderMainPageWithSearch, 
  increaseTapsCount } from "../controllers/api/user.controller.js";

export const userRouter = Router();

userRouter.get("/", renderMainPage);
userRouter.get("/books/:bookId", renderBookPage);
userRouter.get("/search", renderMainPageWithSearch);
userRouter.post("/api/increase-taps", increaseTapsCount);
