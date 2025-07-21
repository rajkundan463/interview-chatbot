import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  Button,
} from "@mui/material";
import { getQuestions } from "../helpers/api-communicator";

interface QuestionItem {
  _id: string;
  question_id: string;
  question: string;
  category: string;
  answer_vector: number[];
  created_at: string;
}

const QuestionsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const data = await getQuestions(category || "");

      const filteredQuestions = data.filter(
        (item: any) => item.question && item.question_id
      );

      setQuestions(filteredQuestions);
    } catch (err: any) {
      console.error("Error fetching questions:", err.message || err);
      setError("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  fetchQuestions();
}, [category]);


  const handlePractice = (questionId: string) => {
    navigate(`/chatpage/${category}/${questionId}`);
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>
        {category?.toUpperCase()} Questions
      </Typography>
      <List>
        {questions.map((q) => (
          <ListItem
            key={q._id}
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography>{q.question}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePractice(q.question_id)}
            >
              Practice
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default QuestionsPage;
