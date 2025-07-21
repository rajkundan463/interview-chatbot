import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const questionSchema = new mongoose.Schema({
  question_id: {
    type: String,
    required: true,
    default: uuidv4, // generates a UUID if not provided
    unique: true,
  },
  question: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["DSA", "OS", "DBMS", "Behavioral"],
  },
  standard_answer: {
    type: String,
  },
  preprocessed_answer: {
    type: String,
  },
  answer_vector: {
    type: [Number],
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
