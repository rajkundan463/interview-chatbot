import { Request, Response } from "express";
import Question from "../models/Question.js";
import axios from "axios";

/* ================= GET ALL (ADMIN) ================= */
// Admin dashboard
export const getAllQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const questions = await Question.find()
      .select("_id question category question_id")
      .sort({ created_at: -1 });

    res.status(200).json(questions);
  } catch (error) {
    console.error("❌ Fetch all questions error:", error);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
};

/* ================= ADD QUESTION ================= */
// Goes to Flask → Gemini → Embeddings → Mongo
export const addQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { question, category } = req.body;

  if (!question || !category) {
    res.status(400).json({ message: "Question & category required" });
    return;
  }

  try {
    const flaskResponse = await axios.post(
      "http://localhost:6000/add-question",
      { question, category },
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(201).json({
      message: "Question added successfully",
      data: flaskResponse.data,
    });
  } catch (error) {
    console.error(" Flask add-question error:", error);
    res.status(500).json({ message: "Failed to add question" });
  }
};


// ✅ RANDOM 10 QUESTIONS BY CATEGORY
export const getQuestions = async (req: Request, res: Response) => {
  const { category } = req.params;

  try {
    const questions = await Question.aggregate([
      { $match: { category } },
      { $sample: { size: 10 } },
      {
        $project: {
          _id: 1,
          question: 1,
          question_id: 1,
          category: 1,
        },
      },
    ]);

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
};


/* ================= UPDATE QUESTION (ADMIN) ================= */
export const updateQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { question } = req.body;

  if (!question) {
    res.status(400).json({ message: "Question text required" });
    return;
  }

  try {
    const updated = await Question.findByIdAndUpdate(
      id,
      { question },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    res.status(200).json({ message: "Updated successfully", updated });
  } catch (error) {
    console.error("❌ Update error:", error);
    res.status(500).json({ message: "Failed to update question" });
  }
};

/* ================= DELETE QUESTION (ADMIN) ================= */
export const deleteQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deleted = await Question.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "Question not found" });
      return;
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(500).json({ message: "Failed to delete question" });
  }
};

/* ================= TEST ================= */
export const test = async (_req: Request, res: Response): Promise<void> => {
  res.json({ success: true });
};
