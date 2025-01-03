import { Request, Response, NextFunction } from "express";
import { TokenPayload, verifyToken } from "../utils/jwt";

export interface CustomRequestWithTokenPayload extends Request {
  user?: TokenPayload;
  token?: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).send("Unauthorized");
      return;
    }

    const payload = verifyToken(token);
    (req as CustomRequestWithTokenPayload).user = payload;
    (req as CustomRequestWithTokenPayload).token = token;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};
