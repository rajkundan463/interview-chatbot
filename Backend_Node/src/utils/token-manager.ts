import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "secret";


export const createToken = (id: string, email: string) => {
  return jwt.sign(
    { id, email },
    JWT_SECRET,
    { expiresIn: "7d" } 
  );
};


export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.signedCookies?.auth_token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };

 
    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
