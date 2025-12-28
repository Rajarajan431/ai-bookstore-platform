import { geminiModel } from "../lib/ai/gemini.client";

interface BookDescriptionInput {
  title: string;
  author: string;
  genre?: string;
}

export async function generateBookDescription(
  data: BookDescriptionInput
): Promise<string> {
  const { title, author } = data;

  const prompt = `
        You are a professional book copywriter.

        Write a compelling book description.

        Title: ${title}
        Author: ${author}

        Rules:
        - 3–4 short paragraphs
        - Clear and engaging tone
        - No emojis
        - Suitable for an online bookstore
        `;

  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
}
