import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
  userAnswer: { type: String, required: true },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  category:{
    type: String,
    required: true,
    index: true,
  },
  questionId: {
    type: String,
    required: true,
    index: true,
  },
  question: {
    type: String,
    required: true,
  },
  history: [attemptSchema],
});

export default mongoose.model("Chat", chatSchema);
