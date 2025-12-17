import { z } from "zod";

export const createBookSchema = z.object({
    title: z.string().min(3),
    author: z.string().min(2),
    description: z.string().min(10),
    price: z.number().positive(),
    stock: z.number().int().min(0).default(1)
});

export const updateBookSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    price: z.number().positive().optional(),
});