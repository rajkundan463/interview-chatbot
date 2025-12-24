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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  getAllQuestions,
  addQuestion,
  deleteQuestion,
} from "../helpers/api-communicator";

type Question = {
  _id: string;
  question: string;
  category: string;
};

const categories = ["DSA", "DBMS", "OOPS", "OS", "CN"];

const QuestionPageAdmin = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
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
    if (!text.trim()) return;
    const q = await addQuestion(text, category);
    setQuestions((prev) => [...prev, q]);
    setText("");
  };

  const handleDelete = async (id: string) => {
    await deleteQuestion(id);
    setQuestions((prev) => prev.filter((q) => q._id !== id));
  };

  const filteredQuestions = questions.filter(
    (q) => q.category === category
  );

  return (
    <Box px={{ xs: 2, md: 6 }} py={4}>
      <Typography variant="h4" mb={3} fontWeight={700}>
        Admin Dashboard – Questions
      </Typography>

      {/* ADD QUESTION SECTION */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography fontWeight={600} mb={2}>
            Add New Question
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              size="small"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>

            <TextField
              fullWidth
              placeholder="Enter question"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <Button variant="contained" onClick={handleAdd}>
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* QUESTION LIST */}
      <Typography variant="h6" mb={2}>
        {category} Questions
      </Typography>

      {filteredQuestions.length === 0 && (
        <Typography>No questions found.</Typography>
      )}

      <Box display="flex" flexDirection="column" gap={2}>
        {filteredQuestions.map((q) => (
          <Card key={q._id}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{q.question}</Typography>

              <IconButton
                color="error"
                onClick={() => handleDelete(q._id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default QuestionPageAdmin;
