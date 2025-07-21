import { useState, useEffect } from "react";
import {
  getAllQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "../helpers/api-communicator";

type Question = {
  _id: string;
  category: string;
  question?: string;
  text?: string;
};

function AdminHome() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("DSA");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  const categories = ["DSA", "OS", "DBMS", "Behavioral"];

  useEffect(() => {
    getAllQuestions()
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Failed to load questions:", err));
  }, []);

  const handleAdd = async () => {
    if (question.trim() === "") return;
    try {
      const newQuestion = await addQuestion(question, category);
      setQuestions([...questions, newQuestion]);
      setQuestion("");
    } catch (err) {
      console.error("Failed to add question:", err);
    }
  };

  const handleEdit = (index: number) => {
    const q = questions[index];
    setQuestion(q.text || q.question || "");
    setCategory(q.category);
    setEditIndex(index);
    setEditId(q._id);
  };

  const handleUpdate = async () => {
    if (question.trim() === "" || editId === null || editIndex === null) return;
    try {
      await updateQuestion(editId, question);
      const updated = [...questions];
      updated[editIndex].text = question;
      setQuestions(updated);
      setQuestion("");
      setEditIndex(null);
      setEditId(null);
    } catch (err) {
      console.error("Failed to update question:", err);
    }
  };

  const handleDelete = async (index: number) => {
    const id = questions[index]._id;
    try {
      await deleteQuestion(id);
      setQuestions(questions.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  return (
    <div>
      <h2>Questions</h2>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={editIndex !== null}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Enter question"
        value={question}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
      /> 

      {editIndex === null ? (
        <button onClick={handleAdd}>Add</button>
      ) : (
        <button onClick={handleUpdate}>Update</button>
      )}

      <ul>
        {questions.map((q, i) => (
          <li key={q._id}>
            <strong>{q.category}</strong>: {q.text || q.question}
            <button onClick={() => handleEdit(i)}>Edit</button>
            <button onClick={() => handleDelete(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminHome;