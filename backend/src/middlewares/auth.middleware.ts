import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";
import { verifyToken } from "../utils/jwt";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const payload = verifyToken<{ userId: number }>(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // ✅ matches global Request.user type
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
