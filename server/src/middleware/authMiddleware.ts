import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AuthRequest } from "../types/express.js";

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
   const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ message: "Not authorized" });
}

const token = authHeader.split(" ")[1];

if (!token) {
  return res.status(401).json({ message: "Token missing" });
}

const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET as string
) as jwt.JwtPayload;

req.userId = decoded.userId as string;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};