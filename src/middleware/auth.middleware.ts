import { type Request, type Response, type NextFunction } from "express";

const authMiddleware = function(req: Request, res: Response, next: NextFunction) {
  next();
};

export default authMiddleware;