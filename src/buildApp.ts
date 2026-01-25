import express, { type Express, type Request, type Response } from "express";
import userRouter from "./routers/user.router.js";
import adminRouter from "./routers/admin.router.js";
import { getPath } from "./helpers/filesHelpers.js";


const expressApp: Express = express();

expressApp.set("view engine", "ejs");

expressApp.use(express.static(getPath("../view/static")));

expressApp.use(express.json());

expressApp.use(userRouter);

expressApp.use("/admin", adminRouter);

expressApp.use((req: Request, res: Response) => {
  res.sendStatus(404);
});

export default expressApp;
