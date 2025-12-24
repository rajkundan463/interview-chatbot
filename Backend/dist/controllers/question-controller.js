import Question from "../models/Question.js";
import axios from 'axios';
// Get all questions from all categories (flat list for frontend)
export async function getAllQuestions(req, res) {
    try {
        const allQuestions = await Question.find({}, { _id: 1, question: 1, category: 1 });
        const formatted = allQuestions.map(q => ({
            _id: q._id,
            text: q.question,
            category: q.category,
        }));
        res.json(formatted);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch questions" });
    }
}
console.log("Question Controller Loaded");
// Add a question to a specific category
export async function addQuestion(req, res) {
    const { question, category } = req.body;
    console.log("➡️ Sending to Flask:", question, category);
    if (!question || !category) {
        return res.status(400).json({ error: "Question text and category are required" });
    }
    try {
        const flaskResponse = await axios.post("http://localhost:6000/add-question", {
            question,
            category,
        });
        const { data } = flaskResponse;
        console.log("Data got " + data);
        res.status(201).json({
            message: "Question added successfully via Flask",
            question: data.question,
            category: data.category,
            answer: data.standard_answer,
        });
    }
    catch (err) {
        console.error("❌ Failed to add question via Flask:", err.message);
        res.status(500).json({ error: "Failed to add question via Flask service" });
    }
}
export async function test(req, res) {
    try {
        console.log("Test endpoint hit");
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update question" });
    }
}
// Update a question by ID
export async function updateQuestion(req, res) {
    const { id } = req.params;
    const { question } = req.body;
    if (!question)
        return res.status(400).json({ error: "Question text is required" });
    try {
        const updated = await Question.findOneAndUpdate({ "questions._id": id }, { $set: { "questions.$.text": question } }, { new: true });
        if (!updated)
            return res.status(404).json({ error: "Question not found" });
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update question" });
    }
}
// Delete a question by ID
export async function deleteQuestion(req, res) {
    const { id } = req.params;
    try {
        const result = await Question.findOneAndUpdate({ "questions._id": id }, { $pull: { questions: { _id: id } } }, { new: true });
        if (!result)
            return res.status(404).json({ error: "Question not found" });
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete question" });
    }
}
export async function getQuestions(req, res, error) {
    const { category } = req.params;
    console.log("category is " + category);
    try {
        const result = await Question.find({ category });
        res.status(200).json(result);
    }
    catch {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Failed to fetch questions" });
    }
}
//# sourceMappingURL=question-controller.js.map