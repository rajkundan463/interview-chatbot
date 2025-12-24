import mongoose from "mongoose";
const attemptSchema = new mongoose.Schema({
    userAnswer: String,
    feedback: String,
    createdAt: { type: Date, default: Date.now },
});
const chatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: String,
    questionId: String,
    question: String,
    history: [attemptSchema],
});
export default mongoose.model("Chat", chatSchema);
//# sourceMappingURL=Chat.js.map