import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const questionSchema = new mongoose.Schema({
    question_id: { type: String, default: uuidv4, unique: true },
    question: { type: String, required: true },
    category: { type: String, required: true },
    standard_answer: String,
    preprocessed_answer: String,
    answer_vector: { type: [Number], default: [] },
    created_at: { type: Date, default: Date.now },
});
export default mongoose.model("Question", questionSchema);
//# sourceMappingURL=Question.js.map