import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import Question from "../models/Question.js";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const EMBEDDING_API_URL = process.env.EMBEDDING_API_URL || "http://localhost:6000/compare";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Evaluate answer using embedding microservice
async function evaluateUserAnswer(questionId: string, userAnswer: string) {
  if (!userAnswer || userAnswer.length < 10) {
    return {
      feedback: "Your answer is too short to evaluate.",
    };
  }

  try {
    const res = await axios.post(
      EMBEDDING_API_URL,
      {
        question_id: questionId,
        user_answer: userAnswer,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return {
      feedback: res.data?.feedback?.trim() || "No feedback generated.",
    };
  } catch (err: any) {
    console.error("Error fetching feedback:", err.message);
    return {
      feedback: "An error occurred while generating feedback.",
    };
  }
}

// ✅ Add new attempt to chat history (or create if first time)
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { question, message: userAnswer } = req.body;
  const { category, questionId } = req.params;

  console.log(questionId, category, question, userAnswer);
  try {
    const user = await User.findById(res.locals.jwtData.id); // ✅ Correct
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }

    const evalResult = await evaluateUserAnswer(questionId, userAnswer);

    const attempt = {
      userAnswer,
      feedback: evalResult.feedback,
      createdAt: new Date(),
    };

    const existingChat = await Chat.findOne({
      userId: user._id,
      category,
      questionId,
    });

    if (existingChat) {
      existingChat.history.push(attempt);
      await existingChat.save();

      return res.status(200).json({
        message: "Answer added to existing history",
        chat: existingChat,
      });
    } else {
      const newChat = await Chat.create({
        userId: user._id,
        category,
        questionId,
        question,
        history: [attempt],
      });

      return res.status(201).json({
        message: "New chat created with first answer",
        chat: newChat,
      });
    }
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// ✅ Get all chat histories for current user
export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({
        message: "User not registered OR Token malfunctioned",
        chats: [],
        user: null,
      });
    }

    const { category, questionId } = req.params;

    if (!questionId) {
      return res.status(400).json({
        message: "Question ID is required",
        chats: [],
        user: null,
      });
    }

    const chats = await Chat.find({
      userId: user._id,
      category,
      questionId,
    }).sort({ createdAt: -1 });

    // ✅ Always fetch the question text
    const questionDoc = await Question.findOne({ category, question_id: questionId });

    if (!questionDoc) {
      return res.status(404).json({
        message: "Question not found",
        chats: [],
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    const questionText = questionDoc.question;

    return res.status(200).json({
      message: "OK",
      chats,
      question: questionText,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "ERROR",
      cause: error.message,
      chats: [],
      user: null,
    });
  }
};


// ✅ Delete all chat history for current user
export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .send("User not registered OR Token malfunctioned");
    }

    await Chat.deleteMany({ userId: user._id });

    return res.status(200).json({ message: "All chats deleted" });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
