import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Card,
} from "@mui/material";
import { getQuestions } from "../helpers/api-communicator";

type Question = {
  _id: string;
  question_id: string;
  question: string;
  category: string;
};

const QUESTIONS_PER_PAGE = 10;

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const QuestionsPageUser = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [visibleQuestions, setVisibleQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRandomQuestions = (questions: Question[]) => {
    const shuffled = shuffleArray(questions);
    setVisibleQuestions(shuffled.slice(0, QUESTIONS_PER_PAGE));
  };

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    getQuestions(category)
      .then((data) => {
        setAllQuestions(data);
        loadRandomQuestions(data);
      })
      .catch(() => {
        setAllQuestions([]);
        setVisibleQuestions([]);
      })
      .finally(() => setLoading(false));
  }, [category]);

  if (!category) {
    return (
      <Typography textAlign="center" mt={6} color="white">
        Invalid Category
      </Typography>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box px={{ xs: 2, md: 6 }} py={4}>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
        color="white"
      >
        {category} – Practice (10 Random Questions)
      </Typography>

      {visibleQuestions.length === 0 ? (
        <Typography color="gray">
          No questions available.
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          {visibleQuestions.map((q, index) => (
            <Card
              key={q._id}
              sx={{
                background: "#0b1220",
                borderRadius: 3,
                p: 2.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              }}
            >
              <Typography color="white" sx={{ flex: 1 }}>
                {index + 1}. {q.question}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  minWidth: "110px",
                  fontWeight: 600,
                  borderRadius: 2,
                }}
                onClick={() =>
                  navigate(`/chatpage/${category}/${q.question_id}`)
                }
              >
                Practice
              </Button>
            </Card>
          ))}
        </Box>
      )}

      {/* NEXT BUTTON */}
      {allQuestions.length > QUESTIONS_PER_PAGE && (
        <Box display="flex" justifyContent="center" mt={5}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: "white",
              borderColor: "#4fd1c5",
              fontWeight: 600,
              px: 4,
              ":hover": {
                background: "#4fd1c5",
                color: "black",
              },
            }}
            onClick={() => loadRandomQuestions(allQuestions)}
          >
            Next 10 Questions →
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default QuestionsPageUser;
