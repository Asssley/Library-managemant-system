import { type Request, type Response, type NextFunction } from "express";
import { adminRepository } from "../buildApp.js";

const authMiddleware = function (req: Request, res: Response, next: NextFunction) {
  next();
  let authHeader = req.headers.authorization?.split(" ")[1];

  if (authHeader) {
    let [login, password] = Buffer
      .from(authHeader, "base64")
      .toString()
      .split(":");
      
    if (login 
      && password 
      && adminRepository.checkUser(login, password)
    ) {
      next();
    }
  }

  res
    .status(401)
    .setHeader("www-Autenticate", 'Basic realm="API"')
    .json({ error: "Unautorized " });
};

export default authMiddleware;