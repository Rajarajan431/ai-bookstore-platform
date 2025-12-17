import { Request, Response } from "express";
import { registerUser, validateUser } from "../services/auth.service";
import { generateToken } from "../utils/jwt";

export async function register(req: Request, res: Response) {
    try {
        const user = await registerUser(req.body);
        
        const token = generateToken(user.id);

        return res.status(201).json({ user, token });
    } catch (err: any) {
        return res.status(400).json({ message: err.message || "Registration Failed"})
    }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    
    const user = await validateUser(email, password);
    
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.id);
   
    return res.json({ user, token });
  } catch (err: any) {
    return res.status(500).json({ message: "Login failed" });
  }
}

export async function me(req: Request, res: Response) {
  res.json(req.user);
}