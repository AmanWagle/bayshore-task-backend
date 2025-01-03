import { Request, Response, NextFunction } from "express";
import { CustomRequestWithTokenPayload } from "./authMiddleware";

export const authorizeRole = (role: string) => {
  return (
    req: CustomRequestWithTokenPayload,
    res: Response,
    next: NextFunction
  ) => {
    const userRole = req.user?.role;
    if (userRole !== role) {
      res.status(403).json({
        message: "Access denied. You don't have correct permissions.",
      });
      return;
    }
    next();
  };
};
