// src/controllers/user.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {
  getUserById,
  updateUser,
  changePassword,
} from "../services/user.service";
import prisma from "../lib/prisma";

export const getMe = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const user = await getUserById(userId);
  res.json(user);
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { name, email } = req.body;

  const updatedUser = await updateUser(userId, { name, email });
  res.json(updatedUser);
};

export const updatePassword = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const { currentPassword, newPassword } = req.body;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) return res.status(404).json({ message: "User not found" });

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid)
    return res.status(400).json({ message: "Invalid password" });

  const hashed = await bcrypt.hash(newPassword, 10);
  await changePassword(userId, hashed);

  res.json({ message: "Password updated successfully" });
};
