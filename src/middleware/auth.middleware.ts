import { type Request, type Response, type NextFunction } from "express";
import { adminRepository } from "../initParts.js";

const authMiddleware = async function (req: Request, res: Response, next: NextFunction) {
  let authHeader = req.headers.authorization?.split(" ")[1];

  if (authHeader) {
    let [login, password] = Buffer
      .from(authHeader, "base64")
      .toString()
      .split(":");
      
    if (login && 
      password &&
      await adminRepository.checkUser(login, password)
    ) {
      return next();
    }
  }

  res
    .status(401)
    .set("WWW-Authenticate", 'Basic realm="API"')
    .json({ error: "Unauthorized" });
};

export default authMiddleware;