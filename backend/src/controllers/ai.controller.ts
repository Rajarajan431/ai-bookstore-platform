import { Request, Response } from "express";
import { generateBookDescription } from "../services/ai.service";

export async function generateDescriptionController(
  req: Request,
  res: Response
) {
  try {
    const { title, author } = req.body;

    if (!title || !author) {
      return res
        .status(400)
        .json({ message: "Title and author are required" });
    }

    const description = await generateBookDescription({
      title,
      author,
    });

    res.json({ description });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "Failed to generate description" });
  }
}
