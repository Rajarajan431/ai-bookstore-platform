import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    name?: string;
    email?: string;
    role?: string;
  };
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "Not authenticated" });

    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const payload = verifyToken<{ userId: number }>(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err: any) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
