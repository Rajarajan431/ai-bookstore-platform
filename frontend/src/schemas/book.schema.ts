import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be greater than 0"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  imageUrl: z.url("Invalid image URL").optional(),
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
