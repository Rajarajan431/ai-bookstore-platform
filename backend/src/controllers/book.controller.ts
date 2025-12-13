import { Request, Response } from "express";
import { createBook, deleteBook, getAllbooks, getBookById, updateBook } from "../services/book.service";
import { createBookSchema, updateBookSchema } from "../validators/book.validation";

export const createBookHandler = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const data = await createBookSchema.parse(req.body);

    const book = await createBook(userId, data);
    res.status(201).json(book);
}

export const getBooksHandler = async (_req: Request, res: Response) => {
  const books = await getAllbooks();
  res.json(books);
};

export const getBookHandler = async (req: Request, res: Response) => {
  const book = await getBookById(Number(req.params.id));

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
};

export const updateBookHandler = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const data = updateBookSchema.parse(req.body);

  const book = await updateBook(
    Number(req.params.id),
    userId,
    data
  );

  res.json(book);
};

export const deleteBookHandler = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  await deleteBook(Number(req.params.id), userId);
  res.status(204).send();
};