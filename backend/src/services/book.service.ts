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

export const getAllBooks = async (q?: string) => {
  return prisma.book.findMany({
    where: q
      ? {
          OR: [
            {
              title: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              author: {
                contains: q,
                mode: "insensitive",
              },
            },
          ],
        }
      : undefined,

    include: {
      seller: {
        select: {
          id: true,
          name: true,
          email: true,
        },
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
  const cleanData = Object.fromEntries(
    Object.entries(data).filter(
      ([_, value]) => value !== undefined
    )
  );

  return prisma.book.update({
    where: { id: bookId },
    data: cleanData,
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