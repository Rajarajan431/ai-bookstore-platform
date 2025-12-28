import { geminiModel } from "./gemini.client";

interface BookDescriptionInput {
  title: string;
  author: string;
  genre?: string;
}

export async function generateBookDescription({
  title,
  author,
  genre,
}: BookDescriptionInput) {
  const prompt = `
You are a professional book copywriter.

Write an engaging, concise book description.

Title: ${title}
Author: ${author}
Genre: ${genre || "Not specified"}

Guidelines:
- 3–4 short paragraphs
- Engaging tone
- No emojis
- Suitable for an online bookstore
`;

  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
}
