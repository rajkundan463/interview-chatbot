import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import { questionChatHistory, sendUserAnswer } from "../helpers/api-communicator";

type ChatAttempt = {
  userAnswer: string;
  feedback: string;
  createdAt: string;
};

const ChatPage = () => {
  const { category, questionId } = useParams();

  const [question, setQuestion] = useState("");
  const [history, setHistory] = useState<ChatAttempt[]>([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const chat = await questionChatHistory(category || "", questionId || "");

      if (chat?.chats?.length > 0) {
        setQuestion(chat.chats[0].question || "");
        const combinedHistory = chat.chats.flatMap((c: { history: ChatAttempt[] }) => c.history);
        setHistory(combinedHistory);
      } else {
        setQuestion(chat.question || "");
        setHistory([]);
      }
    } catch (err) {
      console.error("Failed to load chat data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!answer.trim() || !question.trim()) return;
    await sendUserAnswer(category || "", questionId || "", question, answer.trim());
    setAnswer("");
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [questionId]);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Box p={4} sx={{ backgroundColor: "#ffffff" }}>
      <Typography variant="h5" mb={2} sx={{ color: "#000000" }}>
        Question:
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 4,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography sx={{ color: "#000000" }}>{question}</Typography>
      </Paper>

      <Typography variant="h6" gutterBottom sx={{ color: "#000000" }}>
        Your Previous Answers
      </Typography>

      {history.length === 0 ? (
        <Typography sx={{ color: "#000000" }}>No previous attempts.</Typography>
      ) : (
        history.map((attempt: ChatAttempt, idx) => (
          <Paper
            key={idx}
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: "#f5f5f5",
            }}
          >
            <Typography sx={{ color: "#000000" }} fontWeight={600}>
              Attempt {idx + 1}:
            </Typography>
            <Typography sx={{ color: "#000000" }}>
              User Answer: {attempt.userAnswer}
            </Typography>
            <Typography sx={{ color: "#444444" }}>
              Feedback: {attempt.feedback}
            </Typography>
            <Typography sx={{ color: "#000000" }} variant="caption">
              Submitted on: {new Date(attempt.createdAt).toLocaleString()}
            </Typography>
          </Paper>
        ))
      )}

      <Divider sx={{ my: 3, backgroundColor: "#000000" }} />

      <Typography variant="h6" sx={{ color: "#000000" }}>
        Submit New Answer
      </Typography>
      <TextField
        multiline
        rows={4}
        fullWidth
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
        sx={{
          mt: 2,
          backgroundColor: "#ffffff",
        }}
        inputProps={{ style: { color: "#000000" } }}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default ChatPage;
