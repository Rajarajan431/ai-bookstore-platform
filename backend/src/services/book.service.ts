import prisma from "../lib/prisma";
import { CreateBookInput, UpdateBookInput } from "../types/book.types";

export const createBook = async (
    userId: number,
    data: CreateBookInput
) => {
    return prisma.book.create({
        data: {
            ...data,       
            sellerId: userId,
        },
    });
};

export const getAllbooks = async () => {
    return prisma.book.findMany({
        include: {
            seller: {
                select: { id:true, name: true, email: true }
            },
        },
    });
};

export const getBookById = async (id: number) => {
  return prisma.book.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      author: true,
      description: true,
      price: true,
      imageUrl: true,
      stock: true,
      seller: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const updateBook = async (
  bookId: number,
  userId: number,
  data: UpdateBookInput
) => {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) throw new Error("Book not found");
  if (book.sellerId !== userId)
    throw new Error("Unauthorized");

  return prisma.book.update({
    where: { id: bookId },
    data,
  });
};

export const deleteBook = async (
  bookId: number,
  userId: number
) => {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) throw new Error("Book not found");
  if (book.sellerId !== userId)
    throw new Error("Unauthorized");

  return prisma.book.delete({
    where: { id: bookId },
  });
};