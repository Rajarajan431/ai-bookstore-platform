import { apiFetch } from "./api";
import { Book } from "@/types/book";

export async function getBooks(): Promise<Book[]> {
  return apiFetch<Book[]>("/books");
}

export async function getBookById(id: number): Promise<Book> {
  return apiFetch<Book>(`/books/${id}`);
}

export async function createBook(data: Partial<Book>): Promise<Book> {
  return apiFetch<Book>("/books", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBook(id: number, data: Partial<Book>): Promise<Book> {
  return apiFetch<Book>(`/books/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteBook(id: number): Promise<void> {
  return apiFetch<void>(`/books/${id}`, {
    method: "DELETE",
  });
}
