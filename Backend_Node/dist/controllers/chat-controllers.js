import User from "../models/User.js";
import Chat from "../models/Chat.js";
import Question from "../models/Question.js";
import axios from "axios";
/* ================= ENV SAFE ================= */
const EMBEDDING_API_URL = process.env.EMBEDDING_API_URL ?? "http://localhost:6000/compare";
/* ================= HELPERS ================= */
async function evaluateUserAnswer(questionId, userAnswer) {
    if (!userAnswer || userAnswer.trim().length < 10) {
        return {
            feedback: "Your answer is too short to evaluate. Please add more details.",
        };
    }
    try {
        const response = await axios.post(EMBEDDING_API_URL, {
            question_id: questionId,
            user_answer: userAnswer,
        }, {
            headers: { "Content-Type": "application/json" },
        });
        return {
            feedback: typeof response.data?.feedback === "string"
                ? response.data.feedback.trim()
                : "No feedback generated.",
        };
    }
    catch (error) {
        console.error("❌ Embedding Service Error:", error);
        return {
            feedback: "Failed to evaluate answer. Try again later.",
        };
    }
}
/* ================= CONTROLLERS ================= */
// ✅ Submit / Update chat answer
export const generateChatCompletion = async (req, res, _next) => {
    try {
        const { category, questionId } = req.params;
        const { question, message: userAnswer } = req.body;
        if (!category || !questionId || !userAnswer) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const user = await User.findById(res.locals.jwtData?.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const evaluation = await evaluateUserAnswer(questionId, userAnswer);
        const attempt = {
            userAnswer,
            feedback: evaluation.feedback,
            createdAt: new Date(),
        };
        const chat = await Chat.findOneAndUpdate({ userId: user._id, category, questionId }, {
            $set: { question },
            $push: { history: attempt },
        }, { new: true, upsert: true });
        return res.status(200).json({
            message: "Answer submitted successfully",
            chat,
        });
    }
    catch (error) {
        console.error("❌ Chat Submit Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
/* ================= FETCH CHAT HISTORY ================= */
export const sendChatsToUser = async (req, res, _next) => {
    try {
        const { category, questionId } = req.params;
        const user = await User.findById(res.locals.jwtData?.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const chats = await Chat.find({
            userId: user._id,
            category,
            questionId,
        }).sort({ "history.createdAt": 1 });
        const questionDoc = await Question.findOne({
            category,
            question_id: questionId,
        });
        return res.status(200).json({
            question: questionDoc?.question ?? "",
            chats,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("❌ Fetch Chats Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
/* ================= DELETE ALL USER CHATS ================= */
export const deleteChats = async (req, res, _next) => {
    try {
        const user = await User.findById(res.locals.jwtData?.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await Chat.deleteMany({ userId: user._id });
        return res.status(200).json({ message: "All chats deleted successfully" });
    }
    catch (error) {
        console.error("❌ Delete Chats Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=chat-controllers.js.map