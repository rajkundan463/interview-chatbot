import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  Button,
  Paper,
} from "@mui/material";
import { getQuestions } from "../helpers/api-communicator";

// ✅ Proper type
type Question = {
  _id: string;
  question_id: string;
  question: string;
  category: string;
};

const QuestionsPageUser = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    getQuestions(category)
      .then((data) => setQuestions(data))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }, [category]);

  if (!category) {
    return (
      <Typography textAlign="center" mt={5}>
        Invalid Category
      </Typography>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box px={{ xs: 2, md: 6 }} py={4}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        {category} Questions
      </Typography>

      {questions.length === 0 ? (
        <Typography>No questions available.</Typography>
      ) : (
        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {questions.map((q) => (
            <Paper key={q._id} elevation={2}>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Typography sx={{ flex: 1 }}>
                  {q.question}
                </Typography>

                <Button
                  variant="contained"
                  size="small"
                  onClick={() =>
                    navigate(`/chatpage/${category}/${q.question_id}`)
                  }
                >
                  Practice
                </Button>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default QuestionsPageUser;
