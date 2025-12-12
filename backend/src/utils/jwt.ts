import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
}

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
export const JWT_EXPIRES_IN =  "7d" as const;

export function generateToken(userId: number): string {
  const payload = { userId };
  const options: jwt.SignOptions = { expiresIn: JWT_EXPIRES_IN };
  return jwt.sign(payload, JWT_SECRET, options);
}


export function verifyToken<T = { userId: number }>(token: string): T {
  return jwt.verify(token, JWT_SECRET) as T;
}