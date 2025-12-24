import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import {
  getAllQuestions,
  addQuestion,
  deleteQuestion,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";

const categories = ["DSA", "DBMS", "OOPS", "OS", "Behavioral"];

const QuestionPageAdmin = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("DSA");

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    const data = await getAllQuestions();
    setQuestions(data);
  };

  const handleAdd = async () => {
    if (!text.trim()) return toast.error("Enter question");
    await addQuestion(text, category);
    setText("");
    toast.success.ensure?.("Question added") ?? toast.success("Added");
    loadQuestions();
  };

  const handleDelete = async (id: string) => {
    await deleteQuestion(id);
    toast.success("Deleted");
    loadQuestions();
  };

  const filtered = questions.filter((q) => q.category === category);

  return (
    <Box p={4}>
      {/* TITLE */}
      <Typography variant="h4" mb={3} fontWeight={700} color="white">
        Admin Dashboard – Questions
      </Typography>

      {/* ADD QUESTION */}
      <Card
        sx={{
          mb: 4,
          background: "#0b1220",
          color: "white",
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" mb={2}>
            Add New Question
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              size="small"
              sx={{
                minWidth: 150,
                background: "#111827",
                color: "white",
              }}
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>

            <TextField
              fullWidth
              placeholder="Enter interview question"
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{
                input: { color: "white" },
                background: "#111827",
                borderRadius: 1,
              }}
            />

            <Button variant="contained" onClick={handleAdd}>
              ADD
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* QUESTIONS */}
      <Typography variant="h6" mb={2} color="white">
        {category} Questions
      </Typography>

      {filtered.length === 0 ? (
        <Typography color="gray">No questions added</Typography>
      ) : (
        filtered.map((q) => (
          <Card
            key={q._id}
            sx={{
              mb: 2,
              background: "#0b1220",
              color: "white",
              borderRadius: 3,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* ✅ FIXED FIELD */}
              <Typography>{q.text}</Typography>

              <Button
                color="error"
                variant="outlined"
                onClick={() => handleDelete(q._id)}
              >
                DELETE
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default QuestionPageAdmin;
