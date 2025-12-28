import { apiFetch } from "./api";

export async function generateBookDescription(data: {
  title: string;
  author: string;
  genre?: string;
}) {
  return apiFetch<{ description: string }>("/ai/book-description", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
